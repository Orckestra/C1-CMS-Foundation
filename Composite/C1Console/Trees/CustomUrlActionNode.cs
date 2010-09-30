using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Core.Serialization;
using Composite.Core.WebClient;
using Composite.Core.IO;


namespace Composite.C1Console.Trees
{
    internal enum CustomUrlActionNodeViewType
    {
        GenericView = 0,
        PageBrowser = 1,
        FileDownload = 2,
        DocumentView = 3
    }




    internal sealed class CustomUrlActionNode : ActionNode
    {        
        public string Url { get; internal set; }                                    // Requried        
        public CustomUrlActionNodeViewType ViewType { get; internal set; }          // Optional
        public string ViewLabel { get; internal set; }                              // Optional
        public string ViewToolTip { get; internal set; }                            // Optional
        public ResourceHandle ViewIcon { get; internal set; }                       // Optional
        public Dictionary<string, string> PostParameters { get; internal set; }     // Optional

        // Cached values
        private DynamicValuesHelper UrlDynamicValuesHelper { get; set; }
        private DynamicValuesHelper ViewLabelDynamicValuesHelper { get; set; }
        private DynamicValuesHelper ViewToolTipDynamicValuesHelper { get; set; }


        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            string url = this.UrlDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext);
            url = UrlUtils.ResolvePublicUrl(url);                       

            CustomUrlActionNodeActionToken actoinToken = new CustomUrlActionNodeActionToken(
                url,
                this.ViewLabelDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext),
                this.ViewToolTipDynamicValuesHelper.ReplaceValues(dynamicValuesHelperReplaceContext),
                this.Serialize(),
                this.PermissionTypes);

            ElementAction elementAction = new ElementAction(new ActionHandle(actoinToken))
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


        public CustomUrlActionNodeActionToken(string url, string viewLabel, string viewToolTip, string serializedActionNode, List<PermissionType> permissionTypes)
        {
            this.Url = url;
            this.ViewLabel = viewLabel;
            this.ViewToolTip = viewToolTip;
            _permissionTypes = permissionTypes;
            this.SerializedActionNode = serializedActionNode;
        }


        public string Url { get; private set; }
        public string ViewLabel { get; private set; }
        public string ViewToolTip { get; private set; }
        public string SerializedActionNode { get; private set; }



        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }


        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(sb, "Url", this.Url);
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
                StringConversionServices.DeserializeValueString(dic["ViewLabel"]),
                StringConversionServices.DeserializeValueString(dic["ViewToolTip"]),
                StringConversionServices.DeserializeValueString(dic["SerializedActionNode"]),
                StringConversionServices.DeserializeValueString(dic["PermissionTypes"]).DesrializePermissionTypes().ToList()
            );
        }
    }
}
