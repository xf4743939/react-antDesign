# 面试总结
## MVC、MVP、MVVM，我到底该怎么选？
 ### mvc
 button 点击事件触发:view->Controller 获取用户信息事件的触发：controller -> Model;绑定用户信息到view: controller -> view;
 * 具有一定的分层, Model 彻底解耦,controller 和 view 并没有解耦
 * 城与层之间交互尽量使用回调或者去消息机制完成,尽量避免直接持有
 * controller和view在android中无法做到彻底分离，但在代码逻辑层面一定要分清
 ### MVP
