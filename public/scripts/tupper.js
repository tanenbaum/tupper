(function () {
  'use strict';

  const c = 17;
  const side = 10;
  const canvas = new fabric.StaticCanvas('grid');
  const height = c;
  const width = 106;

  canvas.setHeight(side * height);
  canvas.setWidth(side * width);

  let k = '960 939 379 918 958 884 971 672 962 127 852 754 715 004 339 660 129 306 651 505 519 271 702 802 395 266 424 689 642 842 174 350 718 121 267 153 782 770 623 355 993 237 280 874 144 307 891 325 963 941 337 723 487 857 735 749 823 926 629 715 517 173 716 995 165 232 890 538 221 612 403 238 855 866 184 013 235 585 136 048 828 693 337 902 491 454 229 288 667 081 096 184 496 091 705 183 454 067 827 731 551 705 405 381 627 380 967 602 565 625 016 981 482 083 418 783 163 849 115 590 225 610 003 652 351 370 343 874 461 848 378 737 238 198 224 849 863 465 033 159 410 054 974 700 593 138 339 226 497 249 461 751 545 728 366 702 369 745 461 014 655 997 933 798 537 483 143 786 841 806 593 422 227 898 388 722 980 000 748 404 719';

  let kInt = bigInt(k.replace(/ /g,''));

  for (let y = 0; y < height; y++) {
    let bigY = kInt.add(y);
    for (let x = 0; x < width; x++) {
      if (tupper(x, bigY)) {
        canvas.add(new fabric.Rect({
          width: side,
          height: side,
          left: side * x,
          top: side * y
        }));
      }
    }
  }

  // 1/2 < floor(mod(floor(y/17)*2^(-17*floor(x)-mod(floor(y), 17)),2))
  function tupper(x, y) {
    // -c*floor(x)-mod(floor(y), c)
    let p = bigInt(-c).multiply(x).subtract(y.mod(c));

    // p value should be something small
    let dv = Math.abs(p.value);

    // y/c
    let ydivc = y.divide(c);

    // y/c*2^p
    for (dv; dv > 0; dv--) {
      ydivc = ydivc.divide(2);
    }

    // 1/2 < floor(mod(floor(y/c)*2^p,2))
    return 0.5 < ydivc.mod(2).value;
  }
})();