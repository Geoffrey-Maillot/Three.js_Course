var __CONTROLS_DATA__ = {};

class Joystick
{
    constructor()
    {
        var joystickHTML                = '<div class="JoystickZone"><div class="JoystickMain" id="JoystickMain">	<div class="Joystick" id="Joystick"></div></div></div>';
        //document.body.innerHTML         = document.body.innerHTML + joystickHTML;

        document.body.insertAdjacentHTML("beforeend", joystickHTML);

        this.HTML_JoystickBase          = undefined;
        this.HTML_Joystick              = undefined;

        this.HTML_JoystickBase_Size     = undefined;
        this.HTML_Joystick_Size         = undefined;
        this.HTML_Joystick_Max          = undefined;

        this.positionX                  = 0;
        this.positionY                  = 0;

        this.ready                      = false;
    }

    loadJoystick()
    {
        this.HTML_JoystickBase          = document.getElementById("JoystickMain");
        this.HTML_Joystick              = document.getElementById("Joystick");

        this.HTML_JoystickBase_Size     = $("#JoystickMain").width();
        this.HTML_Joystick_Size         = $("#Joystick").width();
        this.HTML_Joystick_Max          = this.HTML_JoystickBase_Size /2;

        $( "#Joystick" ).css( "left", (  this.HTML_JoystickBase_Size/2 - this.HTML_Joystick_Size/2).toString() ) ;
        $( "#Joystick" ).css( "top",  (  this.HTML_JoystickBase_Size/2 - this.HTML_Joystick_Size/2).toString() ) ;

        this.HTML_JoystickBase.addEventListener('touchstart',   this.joystickTouchStart,    false);
        this.HTML_JoystickBase.addEventListener('touchmove',    this.joystickTouchMove,     false);
        this.HTML_JoystickBase.addEventListener('touchcancel',  this.joystickTouchEnd ,     false);
        this.HTML_JoystickBase.addEventListener('touchend',     this.joystickTouchEnd ,     false);

        __CONTROLS_DATA__["joystick"] = this;

        this.ready = true;

    }

    joystickTouchStart()
    {
          // Nothing
    }

    joystickTouchEnd()
    {
        $( "#Joystick" ).css( "left", (  __CONTROLS_DATA__["joystick"].HTML_JoystickBase_Size/2 - __CONTROLS_DATA__["joystick"].HTML_Joystick_Size/2).toString() ) ;
        $( "#Joystick" ).css( "top",  (  __CONTROLS_DATA__["joystick"].HTML_JoystickBase_Size/2 - __CONTROLS_DATA__["joystick"].HTML_Joystick_Size/2).toString() ) ;

        __CONTROLS_DATA__["joystick"].positionX                  = 0;
        __CONTROLS_DATA__["joystick"].positionY                  = 0;
    }

    joystickTouchMove( )
    {

        var tmpWidth  = ( event.touches[0].clientX  - $('#JoystickMain').offset().left - __CONTROLS_DATA__["joystick"].HTML_Joystick_Size /2);
        var tmpHeigth = ( event.touches[0].clientY  - $('#JoystickMain').offset().top  - __CONTROLS_DATA__["joystick"].HTML_Joystick_Size /2);

        if(tmpHeigth > __CONTROLS_DATA__["joystick"].HTML_JoystickBase_Size - __CONTROLS_DATA__["joystick"].HTML_Joystick_Size)
        {
            tmpHeigth                   = __CONTROLS_DATA__["joystick"].HTML_JoystickBase_Size - __CONTROLS_DATA__["joystick"].HTML_Joystick_Size;
        }

        if(tmpWidth >  __CONTROLS_DATA__["joystick"].HTML_JoystickBase_Size - __CONTROLS_DATA__["joystick"].HTML_Joystick_Size)
        {
            tmpWidth                    = __CONTROLS_DATA__["joystick"].HTML_JoystickBase_Size - __CONTROLS_DATA__["joystick"].HTML_Joystick_Size;
        }

        if(tmpHeigth < 0)
        {
            tmpHeigth                   = 0;
        }

        if(tmpWidth < 0)
        {
            tmpWidth                    = 0;
        }

        $( "#Joystick" ).css( "left",   tmpWidth.toString());
        $( "#Joystick" ).css( "top",    tmpHeigth.toString());

        __CONTROLS_DATA__["joystick"].positionX                  = event.touches[0].clientX  - $('#JoystickMain').offset().left;
        __CONTROLS_DATA__["joystick"].positionY                  = event.touches[0].clientY  - $('#JoystickMain').offset().top;

        if( __CONTROLS_DATA__["joystick"].positionX > __CONTROLS_DATA__["joystick"].HTML_JoystickBase_Size)
        {
            __CONTROLS_DATA__["joystick"].positionX              = __CONTROLS_DATA__["joystick"].HTML_JoystickBase_Size;
        }

        if( __CONTROLS_DATA__["joystick"].positionX <   0)
        {
            __CONTROLS_DATA__["joystick"].positionX              = 0;
        }

        if( __CONTROLS_DATA__["joystick"].positionY > __CONTROLS_DATA__["joystick"].HTML_JoystickBase_Size)
        {
            __CONTROLS_DATA__["joystick"].positionY              = __CONTROLS_DATA__["joystick"].HTML_JoystickBase_Size;
        }

        if( __CONTROLS_DATA__["joystick"].positionY <  0)
        {
            __CONTROLS_DATA__["joystick"].positionY              = 0;
        }

        __CONTROLS_DATA__["joystick"].positionY -= __CONTROLS_DATA__["joystick"].HTML_Joystick_Max;
        __CONTROLS_DATA__["joystick"].positionX -= __CONTROLS_DATA__["joystick"].HTML_Joystick_Max;
    }

    getJoystickPosition()
    {
        var value                       = { x : 0, y : 0};

        if( this.ready == false )
        {
            console.error("Joystick not ready : Please use loadJoystick() !");
            return value;
        }

        value.x                         = (( this.positionX * 100 ) / this.HTML_Joystick_Max );
        value.y                         = (( this.positionY * 100 ) / this.HTML_Joystick_Max );

        return value;
    }
}

class Keyboard
{
    constructor()
    {
        this.is_Left        = false;
        this.is_Right       = false;
        this.is_Top         = false;
        this.is_Bottom      = false;

        this.keydown_events = {}

        this.ready = false;
    }

    loadKeyboard()
    {

        document.onkeydown  = keyboardDown;
        document.onkeyup    = keyboardUp;

        function keyboardDown(e)
        {
            e = e || window.event;
            if      (e.keyCode == '38') { __CONTROLS_DATA__["keyboard"].is_Top      = true;  __CONTROLS_DATA__["keyboard"].is_Bottom      = false; }
            else if (e.keyCode == '40') { __CONTROLS_DATA__["keyboard"].is_Bottom   = true;  __CONTROLS_DATA__["keyboard"].is_Top         = false; }
            else if (e.keyCode == '37') { __CONTROLS_DATA__["keyboard"].is_Left     = true;  __CONTROLS_DATA__["keyboard"].is_Right       = false; }
            else if (e.keyCode == '39') { __CONTROLS_DATA__["keyboard"].is_Right    = true;  __CONTROLS_DATA__["keyboard"].is_Left        = false; }

            Object.keys( __CONTROLS_DATA__["keyboard"].keydown_events ).forEach(keycode => {

              if( keycode == e.keyCode )
              {
                  __CONTROLS_DATA__["keyboard"].keydown_events[keycode]();
              }

            });

            //console.log(e.keyCode);
        }

        function keyboardUp(e)
        {
            e = e || window.event;
            if      (e.keyCode == '38') { __CONTROLS_DATA__["keyboard"].is_Top      = false; }
            else if (e.keyCode == '40') { __CONTROLS_DATA__["keyboard"].is_Bottom   = false; }
            else if (e.keyCode == '37') { __CONTROLS_DATA__["keyboard"].is_Left     = false; }
            else if (e.keyCode == '39') { __CONTROLS_DATA__["keyboard"].is_Right    = false; }
        }

        __CONTROLS_DATA__["keyboard"] = this;

        this.ready = true;
    }

    getKeyboardMove()
    {
        var value                       = { x : 0, y : 0};

        if( this.ready == false )
        {
            console.error("Keyboard not ready : Please use loadKeyboard() !");
            return value;
        }

        if(this.is_Left)
        {
            value.x = -100;
        }

        if(this.is_Right)
        {
            value.x = 100;
        }

        if(this.is_Top)
        {
            value.y = -100;
        }

        if(this.is_Bottom)
        {
            value.y = 100;
        }

        return value;
    }
}

class VirtualButton
{
    constructor( id, config_css, img, callback )
    {
            var buttonHTML = '<a style="';

            Object.keys(config_css).forEach(rule => {

              buttonHTML = buttonHTML + rule + " : " + config_css[rule] + ";"

            });

            buttonHTML = buttonHTML + 'opacity : 0.25; position : absolute; transparent : true; border : none; background : none;" id="'+ id +'"><img style="width : 100%; height : auto;" src="'+ img +'" alt="A_Button"></img></a>';

            //document.body.innerHTML = document.body.innerHTML + buttonHTML;
            document.body.insertAdjacentHTML("beforeend", buttonHTML);

            document.getElementById(id).addEventListener('touchstart', function()
    				{
    						callback();
    				});
    }
}

export class EasyControls
{
    constructor( /*istouch*/ )
    {
        //this.is_touch_device = istouch;
        this.virtualJoystick = undefined;

        this.virtualJoystick = undefined;
        this.keyboardControl = undefined;

        this.virtualBtns = [];
    }

    getMove()
    {
        if( this.virtualJoystick ) { return this.virtualJoystick.getJoystickPosition(); }
        if( this.keyboardControl ) { return this.keyboardControl.getKeyboardMove(); }

        return { x : 0, y : 0};
    }

    addJoystick()
    {
        this.virtualJoystick = new Joystick();
        this.virtualJoystick.loadJoystick();
    }

    addKeyboard()
    {
        this.keyboardControl = new Keyboard();
        this.keyboardControl.loadKeyboard();
    }

    add_keydown_event( keycode, callback)
    {
        this.keyboardControl.keydown_events[ keycode ] = callback;
    }

    addButton(id, config, img, callback)
    {
        this.virtualBtns.push( new VirtualButton(id, config, img,  callback) );
    }
}


export default EasyControls;
