using System.Collections.Generic;
using System.Reflection;
using Composite.Core.WebClient.Services.WampRouter;
using WampSharp.V2.Rpc;

namespace Composite.Plugins.Components.ComponentsEndpoint
{
#warning heavily mocked!
    public class ComponentsResponseMessage
    {
        public string name => "component-selector-shim";
        public string type => "dialogPageShim";
        public Dialog dialog => new Dialog();
    }

    public class Dialog
    {
        public string name => "component-selector";
        public List<Pane> panes => new List<Pane>() { new Pane() };
    }

    public class Pane
    {
        public string name => "component-list";
        public string type => "palette";
        public string headline => "Select a component";
        public string context => "left-aside";
        public Provider provider => new Provider();
        public FinishButton finishButton => new FinishButton();
        public FinishProvider finishProvider => new FinishProvider();
        public CancelButton cancelButton => new CancelButton();
        public CancelProvider cancelProvider => new CancelProvider();
    }

    public class Provider : ProviderResponce
    {
        public string name => "elementSource";
        public string uri => ResponseMessageHelper.GetProcedureName<ComponentsRpcService>(
            nameof(ComponentsRpcService.GetComponents));
    }

    public class FinishButton : ButtonResponse
    {
        public string label => "Next";
        public string style => "main";
    }

    public class FinishProvider : ProviderResponce
    {
        public string name => "elementInsert";
        public string uri => ResponseMessageHelper.GetProcedureName<ComponentsRpcService>(
            nameof(ComponentsRpcService.FinishProvider));
    }

    public class CancelButton : ButtonResponse
    {
        public string label => "Cancel";
    }

    public class CancelProvider : ProviderResponce
    {
        public string name => "componentListCancel";
        public string uri => ResponseMessageHelper.GetProcedureName<ComponentsRpcService>(
            nameof(ComponentsRpcService.CancelProvider));
    }

    internal static class ResponseMessageHelper 
    {
        internal static string GetProcedureName<T>(string methodName) where T : IRpcService
        {
            return ((WampProcedureAttribute)MethodBase.GetMethodFromHandle(
                typeof(T).GetMethod(methodName).MethodHandle)
                .GetCustomAttributes(typeof(WampProcedureAttribute), true)[0]).Procedure;
        }
    }

    public class ProviderResponce
    {
        public virtual string name { get; }
        public virtual string protocol => "wamp";
        public virtual string uri { get;}
    }

    public class ButtonResponse
    {
        public virtual string label { get; }
        public virtual string style { get; }
    }

}
