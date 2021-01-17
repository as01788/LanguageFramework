import { JsonUIEventType, JsonUIManager } from "./JsonUIManager";


const { ccclass, property ,menu} = cc._decorator;
/**
 * UI组件，挂在UI上
 */
@ccclass
@menu("语言组件/UI")
export default class JsonUI extends cc.Component {


    @property({
        displayName: 'Json配置文件路径'
    })
    private JsonPath: string = '';

    private Json: cc.JsonAsset;

    init(jsonPath: string) {
        this.JsonPath = jsonPath;
        cc.director.targetOff(this);

        //注册切换语言回调
        cc.director.on(JsonUIEventType.SWITCH_LANGUAGE, (language) => {
            if (this.Json) {
                this.Json.json.Info.language = language;
                this.initJson(this.Json);
            }
        }, this);
        this.InitLanguage();
    }

    onLoad() {
        // let self =this;
        this.init(this.JsonPath);
    }



    private InitLanguage() {
        if (this.JsonPath) {
            cc.resources.load(this.JsonPath, cc.JsonAsset, (err, json: cc.JsonAsset) => {
                if (err) {
                    console.warn(err);
                    return;
                }
                this.Json = json;
                // JsonUIManager.SwitchLanguage(this.Json.json.Info.language)
                this.Json.json.Info.language = JsonUIManager.CurrentLanguage;
                this.initJson(this.Json);
            });
        }
    }

    private initJson(json: cc.JsonAsset) {
        JsonUIManager.InitUIRes(this.node, json.json.Info);
    }
}
