import { JsonUIManager, LanguageFolder } from "../LanguageFrameworlk/JsonUIResources/JsonUIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class testing extends cc.Component {

    @property(cc.RichText)
    public label:cc.RichText;

    start(){
        cc.director.once('',this.switchLabel,this);
        JsonUIManager.Init(LanguageFolder.中文简体);
    }

    switchLanguage(event,language:LanguageFolder){
        JsonUIManager.SwitchLanguage(language);
        this.switchLabel();
    }

    switchLabel(){
        this.label.string = JsonUIManager.GetLanguage("test2");
    }
}
