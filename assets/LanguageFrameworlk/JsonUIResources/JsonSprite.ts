import { JsonUIEventType, JsonUIManager } from "./JsonUIManager";

const {ccclass, property,menu} = cc._decorator;

@ccclass
@menu("语言组件/Sprite")
export default class JsonSprite extends cc.Component {
    
    @property()
    private resPath:string='';

    private sprite:cc.Sprite;

    init(resPath:string){
        this.resPath=resPath;

        this.sprite=this.node.getComponent(cc.Sprite);

        cc.director.targetOff(this);

        //注册切换语言回调
        cc.director.on(JsonUIEventType.SWITCH_LANGUAGE, (language) => {
            this.InitSprite();
            console.log(language);
        }, this);
        //this.InitSprite();
    }

    onLoad(){
        this.init(this.resPath);
    }


    async InitSprite(){
        if(this.sprite && this.resPath){
            this.sprite.spriteFrame = await JsonUIManager.GetSpriteFrame(this.resPath);
        }
    }
}
