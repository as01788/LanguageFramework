import { JsonUIEventType, JsonUIManager } from "./JsonUIManager";

const { ccclass, property,menu } = cc._decorator;

@ccclass
@menu("语言组件/Label")
export default class JsonLabel extends cc.Component {

    @property({
        displayName: '对应language.json中的id'
    })
    public id: string = '';

    private label: cc.Label | cc.RichText;

    private isInit: boolean = false;

    init(id: string) {
        if (this.isInit) return;

        this.isInit = true;
        cc.director.targetOff(this);

        this.id = id;
        if (!this.label)
            this.label = this.node.getComponent(cc.Label);
        if (!this.label) {
            this.label = this.node.getComponent(cc.RichText);
        }
        if (!this.label) {
            console.warn('null component');
        }

        //注册切换语言回调
        cc.director.on(JsonUIEventType.SWITCH_LANGUAGE, (language) => {
            this.initLabel();
        }, this);

        //this.initLabel();
    }

    onLoad() {
        if (this.id && this.id != '')
            this.init(this.id);
    }

    private initLabel() {
        if (this.label)
            this.label.string = JsonUIManager.GetLanguage(this.id);
    }
}
