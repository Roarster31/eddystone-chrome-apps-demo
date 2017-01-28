(() => {
  'use strict';

  let toggling_adv;

  let toggleAdv = (originalAdv) => {
    // turn on
    console.log("toggling on");
    eddystone.registerAdvertisement(originalAdv)
          .then(adv => {
            // wait 1 sec
            setTimeout(function(){
              // turn off
              console.log("toggling off");
              adv.unregisterAdvertisement()
              .then(adv => {
                // call toggleAdv iff adv == toggling_adv
                if (originalAdv == toggling_adv) {
                  console.log("re-toggling");
                  toggleAdv(originalAdv);
                } else {
                  console.log("not re-toggling");
                }
              }).catch(error => console.log(error));
            }, 5 * 1000);
          }).catch(error => console.log(error));
  };

  let updateCurrentAdvertisement = (id) => {
      if (id.length === 0 && current_adv) {
        // disable all
        // just don't toggle any current ones back on
        toggling_adv = undefined;
      } else {
        let new_adv = {
          type: 'url',
          url: ('jeeves://'+id),
          advertisedTxPower: -100
        };
        toggling_adv = new_adv;
        toggleAdv(toggling_adv);
      }
  };

  let idInput  = document.getElementById("id_input");
  idInput.addEventListener("input", function () {
      updateCurrentAdvertisement(idInput.value);
  }, false);
})();
