import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleLeads } from './leads.mjs';
const env={TELEGRAM_BOT_TOKEN:'12345:test_token_abcdefghijklmnopqrstuvwxyz',TELEGRAM_CHAT_ID:'123456789'};
const body={name:'Анна',contact:'@anna',description:'Нужен сайт для мастерской'};
const request=(data=body,headers={})=>new Request('https://studio.example/api/leads',{method:'POST',headers:{Origin:'https://studio.example','Content-Type':'application/json',...headers},body:JSON.stringify(data)});
test('disabled until both server secrets exist; no delivery attempt',async()=>{
  const response=await handleLeads(request(),{},()=>{throw Error('must not send');});assert.equal(response.status,503);
  const status=await handleLeads(new Request('https://studio.example/api/leads/status'),env);assert.deepEqual(await status.json(),{enabled:true});
});
test('confirmation requires actual Telegram message id; sends plain text to fixed recipient',async()=>{
  const response=await handleLeads(request({...body,description:'<b>текст</b>',chat_id:'attacker'}),env,async(url,options)=>{
    assert.equal(url,`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`);
    const payload=JSON.parse(options.body);assert.equal(payload.chat_id,env.TELEGRAM_CHAT_ID);assert.equal(payload.parse_mode,undefined);assert.match(payload.text,/<b>текст<\/b>/);
    return Response.json({ok:true,result:{message_id:42}});
  });assert.deepEqual(await response.json(),{ok:true});
});
test('Telegram errors and lost confirmations never report success',async()=>{
  for(const result of [{ok:false,description:'private data'}, {ok:true,result:{}}]) {
    const response=await handleLeads(request(),env,async()=>Response.json(result));assert.equal(response.status,502);assert.equal((await response.json()).ok,false);
  }
  const response=await handleLeads(request(),env,async()=>{throw Error('secret token');});assert.equal(response.status,504);assert.equal((await response.text()).includes('secret token'),false);
});
test('rejects foreign origins, malformed/oversized fields, traps and unsupported methods',async()=>{
  const noSend=()=>{throw Error('must not send');};
  assert.equal((await handleLeads(request(body,{Origin:'https://other.example'}),env,noSend)).status,403);
  assert.equal((await handleLeads(request(body,{'Content-Type':'text/plain'}),env,noSend)).status,415);
  for(const value of [null,[],{...body,name:'  '},{...body,description:'x'.repeat(3001)},{...body,contact:123},{...body,website:'spam'}])assert.equal((await handleLeads(request(value),env,noSend)).ok,false);
  assert.equal((await handleLeads(request({...body,description:'x'.repeat(13000)}),env,noSend)).status,413);
  assert.equal((await handleLeads(new Request('https://studio.example/api/leads'),env,noSend)).status,405);
});
test('throttles repeat requests from the same platform IP',async()=>{
  let sent=0;const send=async()=>{sent++;return Response.json({ok:true,result:{message_id:12}});};
  assert.equal((await handleLeads(request(body,{'CF-Connecting-IP':'192.0.2.1'}),env,send)).status,200);
  assert.equal((await handleLeads(request(body,{'CF-Connecting-IP':'192.0.2.1'}),env,send)).status,429);assert.equal(sent,1);
});
