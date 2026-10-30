import http from 'node:http';
if (!process.argv.includes('--dist')) await import('./build.mjs');
const { default: worker } = await import('../dist/server/index.js');
const server=http.createServer(async(req,res)=>{
 try {
  const body=[];let size=0;
  for await(const part of req){size+=part.length;if(size>12000){res.writeHead(413).end();return;}body.push(part);}
  const request=new Request(`http://${req.headers.host}${req.url}`,{method:req.method,headers:req.headers,...(['GET','HEAD'].includes(req.method)?{}:{body:Buffer.concat(body)})});
  const response=await worker.fetch(request,{TELEGRAM_BOT_TOKEN:process.env.TELEGRAM_BOT_TOKEN,TELEGRAM_CHAT_ID:process.env.TELEGRAM_CHAT_ID});
  res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch {res.writeHead(500).end('Ошибка локального сервера');}
});
server.listen(Number(process.env.PORT||4173),'0.0.0.0',()=>console.log(`Local: http://localhost:${server.address().port}`));
