var DEVTOOLS = {
    synth: new AudioContext(),
    osc1_master_pitch: 440,
    osc2_master_pitch: 444.18
};

DEVTOOLS.build_synth = function () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    //OUTPUT VCA
    DEVTOOLS.vca = DEVTOOLS.synth.createGain();
    DEVTOOLS.vca.gain.value = 0;
    DEVTOOLS.vca.connect(DEVTOOLS.synth.destination);

    //OSCILLATOR VCAS
    DEVTOOLS.osc1_vca = DEVTOOLS.synth.createGain();
    DEVTOOLS.osc2_vca = DEVTOOLS.synth.createGain();
    DEVTOOLS.osc1_vca.gain.value = 1;
    DEVTOOLS.osc2_vca.gain.value = 1;
    DEVTOOLS.osc1_vca.connect(DEVTOOLS.vca);
    DEVTOOLS.osc2_vca.connect(DEVTOOLS.vca);

    //OSCILLATORS
    DEVTOOLS.osc1 = DEVTOOLS.synth.createOscillator();
    DEVTOOLS.osc2 = DEVTOOLS.synth.createOscillator();
    DEVTOOLS.osc1.frequency.value = DEVTOOLS.osc1_master_pitch;
    DEVTOOLS.osc2.frequency.value = DEVTOOLS.osc2_master_pitch;
    DEVTOOLS.osc1.start(0);
    DEVTOOLS.osc2.start(0);
    DEVTOOLS.osc1.connect(DEVTOOLS.osc1_vca);
    DEVTOOLS.osc2.connect(DEVTOOLS.osc2_vca);

};

DEVTOOLS.toggle_volume = function () {
    'use strict';
    var x = (DEVTOOLS.vca.gain.value === 1) ? 0 : 1;
    DEVTOOLS.vca.gain.setValueAtTime(x, DEVTOOLS.synth.currentTime);
};

DEVTOOLS.connect_fm = function () {
    'use strict';
    DEVTOOLS.osc1_vca.connect(DEVTOOLS.osc2.frequency);
    DEVTOOLS.osc2_vca.connect(DEVTOOLS.osc1.frequency);
};

$(document).ready(function () {
    DEVTOOLS.build_synth();

    $('#volume-on-off').on('click', DEVTOOLS.toggle_volume);

    $('#connect-fm').on('click', DEVTOOLS.connect_fm);

});
