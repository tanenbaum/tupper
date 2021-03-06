(function () {
  'use strict';

  let tupperWorker = new Worker('./scripts/tupperWorker.js');

  const c = 17;
  const side = 10;
  const canvasElement = document.getElementById('grid');
  const canvas = new fabric.StaticCanvas('grid');
  const height = c;
  const width = 106;

  const canvasHeight = side * height;
  const canvasWidth = side * width;
  const canvasRatio = canvasHeight / canvasWidth;

  canvas.renderOnAddRemove = false;
  canvas.setHeight(canvasHeight);
  canvas.setWidth(canvasWidth);

  resizeCanvas();

  window.onresize = _.debounce(resizeCanvas, 100);

  let k = '960 939 379 918 958 884 971 672 962 127 852 754 715 004 339 660 129 306 651 505 519 271 702 802 395 266 424 689 642 842 174 350 718 121 267 153 782 770 623 355 993 237 280 874 144 307 891 325 963 941 337 723 487 857 735 749 823 926 629 715 517 173 716 995 165 232 890 538 221 612 403 238 855 866 184 013 235 585 136 048 828 693 337 902 491 454 229 288 667 081 096 184 496 091 705 183 454 067 827 731 551 705 405 381 627 380 967 602 565 625 016 981 482 083 418 783 163 849 115 590 225 610 003 652 351 370 343 874 461 848 378 737 238 198 224 849 863 465 033 159 410 054 974 700 593 138 339 226 497 249 461 751 545 728 366 702 369 745 461 014 655 997 933 798 537 483 143 786 841 806 593 422 227 898 388 722 980 000 748 404 719';
  //k = '4858487703217654168507377107565676789145697178497253677539145555247620343537955749299116772611982962556356527603203744742682135448820545638134012705381689785851604674225344958377377969928942335793703373498110479735981161931616997837568312568489938311294622859986621379234205529965392091893253288500432782862263410646820171439206408889517627953930924005233285455643232746873900205120036557171717499335122490912065694632935352302178602108137941774883061885522205403967593003199773578952627785152838963495027790689532144351329310799436758088941551';

  tupperWorker.postMessage({
    config: {
      height,
      width,
      k
    }
  });

  var renderQueue = [];

  tupperWorker.onmessage = function(message) {
    renderQueue.push(message.data);
  }

  // process render queue
  setInterval(() => {
    if (renderQueue.length) {
      let points = renderQueue.shift();

      points.forEach(p => {
        canvas.add(new fabric.Rect({
          width: side,
          height: side,
          left: side * p.x,
          top: side * p.y
        }))
      });

      canvas.renderAll();
    }
  }, 25);

  function resizeCanvas() {
    let cw = document.body.clientWidth;
    let ch = Math.ceil(cw * canvasRatio);

    canvasElement.style.width = `${cw}px`;
    canvasElement.style.height = `${ch}px`;
  }
})();