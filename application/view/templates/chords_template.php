<!-- Start chords_template -->
<style type="text/css">
    .keyboard {
        display: inline-block;
        position: relative;
        left: 300px;
    }
    
    .octave {
        width: 210px;
        height: 100px;
        position: relative;
        margin-bottom: 20px;
        display: inline-block;
    }

    .octave div {
        position: absolute;
        border: 1px solid black;
    }

    .octave .white {
        background-color: white;
        height: 100%;
        width: 30px;
        color: black;
    }

    .octave .black {
        background-color: black;
        height: 60px;
        top: 0;
        z-index: 10;
        width: 20px;
    }
    .octave span {
        position: absolute;
        bottom: 0;
    }
    .octave .white span {
        left: 8px;
    }
    .octave .black span {
        left: 3px;
    }
    .fretboard {
        margin-bottom: 10px;
    }
    .fretboard .neck {
        position: relative;
        left: 200px;
        height: 80px;
        width: 610px;
        border: 1px solid white;
    }
    .fretboard .neck .string {
        position: absolute;
        height: 1px;
        width: 100%;
        background-color: red;
    }
    .fretboard .neck .fret {
        position:absolute;
        height: 80px;
        width: 2px;
        background-color: white;
        display: inline-block;
    }
    .fretboard .neck .inlay {
        position: absolute;
        top: 38px;
        height: 4px;
        width: 4px;
        background-color: white;
    }

    .fretboard .neck .note {
        position: absolute;
        top: -2px;
        background-color: grey;
        z-index: 20;
        font-size: .8em;
        text-align: center;
        v-align: middle;
        border: 1px solid black;
    }

 }
</style>
<div class="fretboard" controller="FretboardController">
    <div class="neck">
        <div class="inlay" style="left: 97px"></div>
        <div class="inlay" style="left: 171px"></div>
        <div class="inlay" style="left: 241px"></div>
        <div class="inlay" style="left: 307px"></div>
        <div class="inlay" style="left: 399px"></div>
        <div class="inlay" style="left: 481px"></div>
        <div class="inlay" style="left: 531px"></div>
        <div class="inlay" style="left: 577px"></div>
        <div class="fret" style="left: 40px;"></div>
        <div class="fret" style="left: 79px;"></div>
        <div class="fret" style="left: 117px;"></div>
        <div class="fret" style="left: 154px;"></div>
        <div class="fret" style="left: 190px;"></div>
        <div class="fret" style="left: 225px;"></div>
        <div class="fret" style="left: 259px;"></div>
        <div class="fret" style="left: 292px;"></div>
        <div class="fret" style="left: 324px;"></div>
        <div class="fret" style="left: 355px;"></div>
        <div class="fret" style="left: 385px;"></div>
        <div class="fret" style="left: 414px;"></div>
        <div class="fret" style="left: 442px;"></div>
        <div class="fret" style="left: 469px;"></div>
        <div class="fret" style="left: 495px;"></div>
        <div class="fret" style="left: 520px;"></div>
        <div class="fret" style="left: 544px;"></div>
        <div class="fret" style="left: 567px;"></div>
        <div class="fret" style="left: 589px;"></div>

        <div class="string 0" style="top: 4px;">

        </div>
        <div class="string 1" style="top: 18px;">

        </div>
        <div class="string 2" style="top: 32px;">

        </div>
        <div class="string 3" style="top: 46px;">

        </div>
        <div class="string 4" style="top: 60px;">

        </div>
        <div class="string 5" style="top: 74px;">

        </div>
    </div>
</div>
<div class="keyboard" controller="KeyboardController">
    <div class="octave 1" style="margin-right:0">
        <div class="c bs white"><span></span></div>
        <div class="cs dl black"style="left:20px;"><span></span></div>
        <div class="d white" style="left:30px"><span></span></div>
        <div class="ds el black" style="left:50px"><span></span></div>
        <div class="e fl white" style="left:60px"><span></span></div>
        <div class="f es white" style="left:90px"><span></span></div>
        <div class="fs gl black" style="left:110px"><span></span></div>
        <div class="g white" style="left:120px"><span></span></div>
        <div class="gs al black" style="left:140px"><span></span></div>
        <div class="a white" style="left:150px"><span></span></div>
        <div class="as bl black" style="left:170px"><span></span></div>
        <div class="b white" style="left:180px"><span></span></div>
    </div>
    <div class="octave 2"style="left:-5px">
        <div class="c bs white"><span></span></div>
        <div class="cs dl black"style="left:20px;"><span></span></div>
        <div class="d white" style="left:30px"><span></span></div>
        <div class="ds el black" style="left:50px"><span></span></div>
        <div class="e fl white" style="left:60px"><span></span></div>
        <div class="f es white" style="left:90px"><span></span></div>
        <div class="fs gl black" style="left:110px"><span></span></div>
        <div class="g white" style="left:120px"><span></span></div>
        <div class="gs al black" style="left:140px"><span></span></div>
        <div class="a white" style="left:150px"><span></span></div>
        <div class="as bl black" style="left:170px"><span></span></div>
        <div class="b white" style="left:180px"><span></span></div>
    </div>
</div>
<br />
<span>Key</span>
<select controller="KeySelectController" class="key_select">
    <option value="c">c</option>
    <option value="c+">c+</option>
    <option value="d">d</option>
    <option value="e">e</option>
    <option value="f">f</option>
    <option value="g">g</option>
    <option value="a">a</option>
    <option value="b">b</option>
</select>
<span>Scale</span>
<select controller="ScaleSelectController" class="scale_select">
    <option value="major">major</option>
    <option value="dorian">dorian</option>
    <option value="phrygian">phrygian</option>
    <option value="lydian">lydian</option>
    <option value="mixolydian">mixolydian</option>
    <option value="minor">minor</option>
    <option value="locrian">locrian</option>
    <option value="h_minor">harmonic minor</option>
</select>
<span>Keyboard Type</span>
<select controller="TypeSelectController" class="type_select">
    <option value="numbers">numbers</option>
    <option value="letters">letters</option>
</select>
<div class="crease_button" controller="ProcessScaleController" style="width: 50px;">Go</div>
<div class="chord_chart_container"></div>
<!-- end chords_template -->