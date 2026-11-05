export const renderSeoChess = asset => `<section class="seo-chess" aria-label="Шахматная сцена">
<svg class="stage" viewBox="128 0 1280 1024" preserveAspectRatio="none" aria-hidden="true">
<defs>
 <image id="original" width="1536" height="1024" href="${asset('assets/seo-chess-figures.webp')}"/>
 <clipPath id="q"><path d="M520 134Q535 130 539 145Q540 154 533 161Q537 165 537 173Q563 196 585 201L591 185Q579 175 587 167Q596 159 604 167Q613 178 602 186L599 201L614 196Q605 186 615 181Q626 176 631 187Q635 197 622 202Q593 247 586 295Q599 302 585 310L585 316Q600 321 594 326Q614 327 614 341Q614 353 585 355Q565 410 582 503Q593 565 628 618Q650 624 642 638Q637 649 652 657Q691 688 671 722L669 730Q681 734 678 749L679 759Q676 789 528 791Q382 789 374 762L375 745Q374 732 387 726Q360 695 400 666Q425 648 412 638Q404 624 424 619Q457 566 469 503Q489 416 470 355Q436 353 439 338Q443 327 461 325Q451 320 465 314L466 309Q451 304 464 296Q453 245 428 201Q416 200 417 189Q421 178 432 180Q440 185 438 195L449 202L450 188Q440 183 443 172Q449 162 459 167Q469 174 462 184Q482 200 496 199Q512 184 514 170Q515 164 519 161Q506 155 511 143Q514 136 520 134Z"/></clipPath>
 <clipPath id="p"><path d="M941 470C971 470 991 490 991 517Q991 544 968 557Q998 564 995 574Q993 580 972 583Q968 644 998 674Q1009 678 1004 689Q1006 695 1018 703Q1040 718 1030 740Q1041 746 1039 759L1037 773Q1029 786 944 789Q861 786 850 774L848 755Q848 745 859 740Q840 722 868 703Q883 693 881 683Q875 677 888 673Q913 639 912 583Q883 578 889 568Q893 563 913 558Q891 544 891 517C892 490 911 470 941 470Z"/></clipPath>
 <filter id="blur"><feGaussianBlur stdDeviation="10"/></filter>
</defs>
<image width="1536" height="1024" href="${asset('assets/seo-chess-board.webp')}"/>
<g class="parts"><g class="queen"><ellipse cx="526" cy="775" rx="151" ry="23" fill="#000" opacity=".55" filter="url(#blur)"/><use href="#original" clip-path="url(#q)"/></g><g class="pawn"><ellipse cx="942" cy="775" rx="88" ry="15" fill="#000" opacity=".5" filter="url(#blur)"/><use href="#original" clip-path="url(#p)"/></g></g>
<use class="initial" href="#original"/>
</svg>
<button class="hit" type="button" aria-label="Сделать ход ферзём"></button>
<div class="hint"><span class="desktop">Наведите на ферзя, чтобы сделать ход</span><span class="touch">Нажмите на ферзя, чтобы сделать ход</span></div>
<p class="chess-status" role="status"></p></section>`;
