using System.Collections.Generic;
using System.Reflection;
using Composite.Core;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient.Services.WampRouter;
using Composite.Plugins.Components.ComponentTags;
using WampSharp.V2.Rpc;

namespace Composite.Plugins.Components.ComponentsEndpoint
{
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
        public string SearchPlaceholder => StringResourceSystemFacade.GetString("Composite.Web.VisualEditor",
                    "Components.Window.DialogFilterPlaceholder");
        /// <exclude />
        public List<Pane> Panes => new List<Pane>() { new Pane() };
    }

    /// <exclude />
    public class Pane
    {
        /// <exclude />
        public Pane()
        {
            var tagManager = ServiceLocator.GetRequiredService<TagManager>();
            Categories = tagManager.GetAllTags();
        }

        /// <exclude />
        public string Name => "component-list";
        /// <exclude />
        public string Type => "palette";

        /// <exclude />
        public string Headline => StringResourceSystemFacade.GetString("Composite.Web.VisualEditor",
                    "Components.Window.Headline");
        /// <exclude />
        public string Context => "left-aside";
        /// <exclude />
        public string NoItemsText => StringResourceSystemFacade.GetString("Composite.Web.VisualEditor",
                    "Components.Window.NoItems");
        /// <exclude />
        public IEnumerable<string> Categories { get; }
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
        /// <exclude />
        public UpdateProvider UpdateTopic => new UpdateProvider();
    }

    /// <exclude />
    public class Provider : ProviderResponse
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
        public override string Label => StringResourceSystemFacade.GetString("Composite.Web.VisualEditor",
                    "Components.Window.Ok");
        /// <exclude />
        public override string Style => "main";
    }

    /// <exclude />
    public class FinishProvider : ProviderResponse
    {
        /// <exclude />
        public override string Name => "elementInsert";
        /// <exclude />
        public override string Protocol => "post";
        /// <exclude />
        public string Response => "Dialog.RESPONSE_ACCEPT";
        /// <exclude />
        public string Action => "DialogPageBinding.ACTION_RESPONSE";
        /// <exclude />
        public List<string> Markup => new List<string>() { "selectedComponentDefinition" };
        /// <exclude />
        public override string Uri => "";
    }

    /// <exclude />
    public class CancelButton : ButtonResponse
    {
        /// <exclude />
        public override string Label => StringResourceSystemFacade.GetString("Composite.Web.VisualEditor",
                    "Components.Window.Cancel");
        /// <exclude />
        public override string Style => "dialog";
    }

    /// <exclude />
    public class CancelProvider : ProviderResponse
    {
        /// <exclude />
        public override string Name => "componentListCancel";
        /// <exclude />
        public override string Protocol => "post";
        /// <exclude />
        public string Action => "DialogPageBinding.ACTION_RESPONSE";
        /// <exclude />
        public string Response => "Dialog.RESPONSE_CANCEL";
        /// <exclude />
        public override string Uri => "";

    }

    /// <exclude />
    public class UpdateProvider : ProviderResponse
    {
        /// <exclude />
        public override string Name => "updateTopic";
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
    public abstract class ProviderResponse
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
