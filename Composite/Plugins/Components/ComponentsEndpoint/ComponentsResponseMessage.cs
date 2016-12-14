using System.Collections.Generic;
using System.Reflection;
using Composite.Core.WebClient.Services.WampRouter;
using WampSharp.V2.Rpc;

namespace Composite.Plugins.Components.ComponentsEndpoint
{
#warning heavily mocked!
    /// <exclude />
    public class ComponentsResponseMessage
    {
        /// <exclude />
        public string Name => "component-selector-shim";
        /// <exclude />
        public string Type => "dialogPageShim";
        /// <exclude />
        public Dialog Dialog => new Dialog();
    }

    /// <exclude />
    public class Dialog
    {
        /// <exclude />
        public string Name => "component-selector";
        /// <exclude />
        public List<Pane> Panes => new List<Pane>() { new Pane() };
    }

    /// <exclude />
    public class Pane
    {
        /// <exclude />
        public string Name => "component-list";
        /// <exclude />
        public string Type => "palette";
        /// <exclude />
        public string Headline => "Select a component";
        /// <exclude />
        public string Context => "left-aside";
        /// <exclude />
        public List<string> Categories => new List<string>() { "gallery", "popular" };
        /// <exclude />
        public Provider Provider => new Provider();
        /// <exclude />
        public FinishButton FinishButton => new FinishButton();
        /// <exclude />
        public FinishProvider FinishProvider => new FinishProvider();
        /// <exclude />
        public CancelButton CancelButton => new CancelButton();
        /// <exclude />
        public CancelProvider CancelProvider => new CancelProvider();

        public List<ProviderResponce> Topics => new List<ProviderResponce>() {new ChangeProvider()};
    }

    /// <exclude />
    public class Provider : ProviderResponce
    {
        /// <exclude />
        public override string Name => "elementSource";
        /// <exclude />
        public override string Uri => ResponseMessageHelper.GetProcedureName<ComponentsRpcService>(
            nameof(ComponentsRpcService.GetComponents));
    }

    /// <exclude />
    public class FinishButton : ButtonResponse
    {
        /// <exclude />
        public override string Label => "Next";
        /// <exclude />
        public override string Style => "main";
    }

    /// <exclude />
    public class FinishProvider : ProviderResponce
    {
        /// <exclude />
        public override string Name => "elementInsert";
        /// <exclude />
        public override string Uri => ResponseMessageHelper.GetProcedureName<ComponentsRpcService>(
            nameof(ComponentsRpcService.FinishProvider));
    }

    /// <exclude />
    public class CancelButton : ButtonResponse
    {
        /// <exclude />
        public override string Label => "Cancel";
        /// <exclude />
        public override string Style => "";
    }

    /// <exclude />
    public class CancelProvider : ProviderResponce
    {
        /// <exclude />
        public override string Name => "componentListCancel";
        /// <exclude />
        public override string Uri => ResponseMessageHelper.GetProcedureName<ComponentsRpcService>(
            nameof(ComponentsRpcService.CancelProvider));
    }

    public class ChangeProvider : ProviderResponce
    {
        /// <exclude />
        public override string Name => "componentChange";
        /// <exclude />
        public override string Uri => ComponentPublisher.Topic;
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


    /// <summary>
    /// Page structure provider contract
    /// </summary>
    public abstract class ProviderResponce
    {
        /// <summary>
        /// provider's name
        /// </summary>
        public abstract string Name { get; }

        /// <summary>
        /// provider's protocol
        /// </summary>
        public virtual string Protocol => "wamp";
        /// <summary>
        /// provider's uri
        /// </summary>
        public abstract string Uri { get; }
    }

    /// <summary>
    /// page structure button contract
    /// </summary>
    public abstract class ButtonResponse
    {
        /// <summary>
        /// button label
        /// </summary>
        public abstract string Label { get; }

        /// <summary>
        /// button style
        /// </summary>
        public abstract string Style { get; }
    }

}

