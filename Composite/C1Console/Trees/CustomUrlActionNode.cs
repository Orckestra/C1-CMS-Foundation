using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Core.Serialization;
using Composite.Core.WebClient;


namespace Composite.C1Console.Trees
{
    internal enum CustomUrlActionNodeViewType
    {
        GenericView = 0,
        PageBrowser = 1,
        FileDownload = 2,
        DocumentView = 3,
        ExternalView = 4
    }




    internal sealed class CustomUrlActionNode : ActionNode
    {        
        public string Url { get; internal set; }                                    // Requried        
        public CustomUrlActionNodeViewType ViewType { get; internal set; }          // Optional
        public string ViewLabel { get; internal set; }                              // Optional
        public string ViewToolTip { get; internal set; }                            // Optional
        public ResourceHandle ViewIcon { get; internal set; }                       // Optional
        public bool External { get; internal set; }                                 // Optional
        public Dictionary<string, string> PostParameters { get; internal set; }     // Optional

        // Cached values
        private DynamicValuesHelper UrlDynamicValuesHelper { get; set; }
        private DynamicValuesHelper ViewLabelDynamicValuesHelper { get; set; }
        private DynamicValuesHelper ViewToolTipDynamicValuesHelper { get; set; }


        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            string url = this.UrlDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext);

            this.External = url.Contains("//");

            if(!External)
            {
                url = UrlUtils.ResolvePublicUrl(url);
            }

            CustomUrlActionNodeActionToken actionToken = new CustomUrlActionNodeActionToken(
                url,
                this.External,
                (this.External ? "externalview" : "documentview"),
                this.ViewLabelDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext),
                this.ViewToolTipDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext),
                this.Serialize(),
                this.PermissionTypes);

            ElementAction elementAction = new ElementAction(new ActionHandle(actionToken))
            {
                VisualData = CreateActionVisualizedData(dynamicValuesHelperReplaceContext)
            };

            actionAdder(elementAction);
        }



        protected override void OnInitialize()
        {
            this.UrlDynamicValuesHelper = new DynamicValuesHelper(this.Url);
            this.UrlDynamicValuesHelper.Initialize(this.OwnerNode);
            this.UrlDynamicValuesHelper.UseUrlEncode = true;

            this.ViewLabelDynamicValuesHelper = new DynamicValuesHelper(this.ViewLabel);
            this.ViewLabelDynamicValuesHelper.Initialize(this.OwnerNode);

            this.ViewToolTipDynamicValuesHelper = new DynamicValuesHelper(this.ViewToolTip);
            this.ViewToolTipDynamicValuesHelper.Initialize(this.OwnerNode);
        }
    }



    internal sealed class CustomUrlActionNodeActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            CustomUrlActionNodeActionToken customUrlActionNodeActionToken = (CustomUrlActionNodeActionToken)actionToken;

            CustomUrlActionNode customUrlActionNode = (CustomUrlActionNode)ActionNode.Deserialize(customUrlActionNodeActionToken.SerializedActionNode);

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            switch (customUrlActionNode.ViewType)
            {
                case CustomUrlActionNodeViewType.DocumentView:
                    {
                        string viewId = Guid.NewGuid().ToString();
                        string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);

                        OpenViewMessageQueueItem openViewMessageQueueItem = new OpenViewMessageQueueItem()
                        {
                            ViewId = viewId,
                            EntityToken = serializedEntityToken,
                            Label = customUrlActionNodeActionToken.ViewLabel,
                            ToolTip = customUrlActionNodeActionToken.ViewToolTip,
                            IconResourceHandle = customUrlActionNode.ViewIcon,
                            Url = customUrlActionNodeActionToken.Url,
                            UrlPostArguments = customUrlActionNode.PostParameters
                        };
                        ConsoleMessageQueueFacade.Enqueue(openViewMessageQueueItem, currentConsoleId);

                        BindEntityTokenToViewQueueItem bindEntityTokenToViewQueueItem = new BindEntityTokenToViewQueueItem()
                        {
                            ViewId = viewId,
                            EntityToken = serializedEntityToken
                        };
                        ConsoleMessageQueueFacade.Enqueue(bindEntityTokenToViewQueueItem, currentConsoleId);
                    }
                    break;

                case CustomUrlActionNodeViewType.ExternalView:
                    {
                        string viewId = Guid.NewGuid().ToString();
                        string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);

                        OpenExternalViewQueueItem openExternalViewQueueItem = new OpenExternalViewQueueItem(entityToken)
                        {
                            ViewId = viewId,
                            EntityToken = serializedEntityToken,
                            Label = customUrlActionNodeActionToken.ViewLabel,
                            ToolTip = customUrlActionNodeActionToken.ViewToolTip,
                            IconResourceHandle = customUrlActionNode.ViewIcon,
                            Url = customUrlActionNodeActionToken.Url,
                            ViewType = customUrlActionNodeActionToken.ViewType,
                            UrlPostArguments = customUrlActionNode.PostParameters
                        };
                        ConsoleMessageQueueFacade.Enqueue(openExternalViewQueueItem, currentConsoleId);

                        BindEntityTokenToViewQueueItem bindEntityTokenToViewQueueItem = new BindEntityTokenToViewQueueItem()
                        {
                            ViewId = viewId,
                            EntityToken = serializedEntityToken
                        };
                        ConsoleMessageQueueFacade.Enqueue(bindEntityTokenToViewQueueItem, currentConsoleId);
                    }
                    break;

                case CustomUrlActionNodeViewType.GenericView:
                    {
                        string viewId = Guid.NewGuid().ToString();
                        string serializedEntityToken = EntityTokenSerializer.Serialize(entityToken, true);

                        OpenGenericViewQueueItem openGenericViewQueueItem = new OpenGenericViewQueueItem(entityToken)
                        {
                            ViewId = viewId,
                            EntityToken = serializedEntityToken,
                            Label = customUrlActionNodeActionToken.ViewLabel,
                            ToolTip = customUrlActionNodeActionToken.ViewToolTip,
                            IconResourceHandle = customUrlActionNode.ViewIcon,
                            Url = customUrlActionNodeActionToken.Url,
                            UrlPostArguments = customUrlActionNode.PostParameters
                        };
                        ConsoleMessageQueueFacade.Enqueue(openGenericViewQueueItem, currentConsoleId);

                        BindEntityTokenToViewQueueItem bindEntityTokenToViewQueueItem = new BindEntityTokenToViewQueueItem()
                        {
                            ViewId = viewId,
                            EntityToken = serializedEntityToken
                        };
                        ConsoleMessageQueueFacade.Enqueue(bindEntityTokenToViewQueueItem, currentConsoleId);
                    }
                    break;


                case CustomUrlActionNodeViewType.PageBrowser:
                    Dictionary<string, string> arguments = new Dictionary<string, string>();
                    arguments.Add("URL", customUrlActionNodeActionToken.Url);

                    OpenHandledViewMessageQueueItem openHandledViewMessageQueueItem = new OpenHandledViewMessageQueueItem(
                        EntityTokenSerializer.Serialize(entityToken, true), 
                        "Composite.Management.Browser", 
                        arguments
                    );

                    ConsoleMessageQueueFacade.Enqueue(openHandledViewMessageQueueItem, currentConsoleId);                    
                    break;


                case CustomUrlActionNodeViewType.FileDownload:
                    DownloadFileMessageQueueItem downloadFileMessageQueueItem = new DownloadFileMessageQueueItem(customUrlActionNodeActionToken.Url);

                    ConsoleMessageQueueFacade.Enqueue(downloadFileMessageQueueItem, currentConsoleId);                    
                    break;
            }


            return null;
        }
    }




    [ActionExecutor(typeof(CustomUrlActionNodeActionExecutor))]
    internal sealed class CustomUrlActionNodeActionToken : ActionToken
    {
        private List<PermissionType> _permissionTypes;


        public CustomUrlActionNodeActionToken(string url, bool external, string viewtype, string viewLabel, string viewToolTip, string serializedActionNode, List<PermissionType> permissionTypes)
        {
            this.Url = url;
            this.Extenal = external;
            this.ViewType = viewtype;
            this.ViewLabel = viewLabel;
            this.ViewToolTip = viewToolTip;
            _permissionTypes = permissionTypes;
            this.SerializedActionNode = serializedActionNode;
        }


        public string Url { get; private set; }
        public bool Extenal { get; private set; }
        public string ViewLabel { get; private set; }
        public string ViewToolTip { get; private set; }
        public string ViewType { get; private set; }
        public string SerializedActionNode { get; private set; }



        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }


        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "Url", this.Url);
            StringConversionServices.SerializeKeyValuePair(sb, "External", this.Extenal.ToString(CultureInfo.InvariantCulture).ToLowerInvariant());
            StringConversionServices.SerializeKeyValuePair(sb, "ViewType", this.ViewType);
            StringConversionServices.SerializeKeyValuePair(sb, "ViewLabel", this.ViewLabel);
            StringConversionServices.SerializeKeyValuePair(sb, "ViewToolTip", this.ViewToolTip);
            StringConversionServices.SerializeKeyValuePair(sb, "SerializedActionNode", this.SerializedActionNode);
            StringConversionServices.SerializeKeyValuePair(sb, "PermissionTypes", _permissionTypes.SerializePermissionTypes());

            return sb.ToString();
        }


        public static ActionToken Deserialize(string serializedData)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serializedData);            

            return new CustomUrlActionNodeActionToken
            (
                StringConversionServices.DeserializeValueString(dic["Url"]),
                StringConversionServices.DeserializeValueBool(dic["External"]),
                StringConversionServices.DeserializeValueString(dic["ViewType"]),
                StringConversionServices.DeserializeValueString(dic["ViewLabel"]),
                StringConversionServices.DeserializeValueString(dic["ViewToolTip"]),
                StringConversionServices.DeserializeValueString(dic["SerializedActionNode"]),
                StringConversionServices.DeserializeValueString(dic["PermissionTypes"]).DesrializePermissionTypes().ToList()
            );
        }
    }
}
