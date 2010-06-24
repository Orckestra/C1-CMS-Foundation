using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Actions;
using Composite.ConsoleEventSystem;
using Composite.Elements;
using Composite.ResourceSystem;
using Composite.Security;
using Composite.Serialization;


namespace Composite.Trees
{
    public enum CustomUrlActionNodeViewType
    {
        GenericView = 0,
        PageBrowser = 1,
        FileDownload = 2,
        DocumentView = 3
    }




    public sealed class CustomUrlActionNode : ActionNode
    {        
        public string Url { get; internal set; }                                    // Requried        
        public CustomUrlActionNodeViewType ViewType { get; internal set; }          // Optional
        public string ViewLabel { get; internal set; }                              // Optional
        public string ViewToolTip { get; internal set; }                            // Optional
        public ResourceHandle ViewIcon { get; internal set; }                       // Optional
        public Dictionary<string, string> PostParameters { get; internal set; }     // Optional

        // Cached values
        private DynamicValuesHelper ViewLabelDynamicValuesHelper { get; set; }
        private DynamicValuesHelper ViewToolTipDynamicValuesHelper { get; set; }


        protected override void OnAddAction(Action<ElementAction> actionAdder, EntityToken entityToken, TreeNodeDynamicContext dynamicContext, DynamicValuesHelperReplaceContext dynamicValuesHelperReplaceContext)
        {
            CustomUrlActionNodeActionToken actoinToken = new CustomUrlActionNodeActionToken(
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
            this.ViewLabelDynamicValuesHelper = new DynamicValuesHelper(this.ViewLabel);
            this.ViewLabelDynamicValuesHelper.Initialize(this.OwnerNode);

            this.ViewToolTipDynamicValuesHelper = new DynamicValuesHelper(this.ViewToolTip);
            this.ViewToolTipDynamicValuesHelper.Initialize(this.OwnerNode);
        }
    }



    public sealed class CustomUrlActionNodeActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            CustomUrlActionNodeActionToken customUrlActionNodeActionToken = (CustomUrlActionNodeActionToken)actionToken;

            CustomUrlActionNode customUrlActionNode = (CustomUrlActionNode)ActionNode.Deserialize(customUrlActionNodeActionToken.SerializedActionNode);

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            switch (customUrlActionNode.ViewType)
            {
                case CustomUrlActionNodeViewType.DocumentView:
                    OpenViewMessageQueueItem openViewMessageQueueItem = new OpenViewMessageQueueItem()
                    {
                        EntityToken = EntityTokenSerializer.Serialize(entityToken),
                        Label = customUrlActionNodeActionToken.ViewLabel,
                        ToolTip = customUrlActionNodeActionToken.ViewToolTip,
                        IconResourceHandle = customUrlActionNode.ViewIcon,
                        Url = customUrlActionNode.Url,
                        UrlPostArguments = customUrlActionNode.PostParameters
                    };
                    // ${icon:Composite.Icons:folder}
                    ConsoleMessageQueueFacade.Enqueue(openViewMessageQueueItem, currentConsoleId);
                    break;

                case CustomUrlActionNodeViewType.GenericView:
                    OpenGenericViewQueueItem openGenericViewQueueItem = new OpenGenericViewQueueItem(entityToken)
                    {
                        Label = customUrlActionNodeActionToken.ViewLabel,
                        ToolTip = customUrlActionNodeActionToken.ViewToolTip,
                        IconResourceHandle = customUrlActionNode.ViewIcon,
                        Url = customUrlActionNode.Url,
                        UrlPostArguments = customUrlActionNode.PostParameters
                    };
                    ConsoleMessageQueueFacade.Enqueue(openGenericViewQueueItem, currentConsoleId);
                    break;


                case CustomUrlActionNodeViewType.PageBrowser:
                    Dictionary<string, string> arguments = new Dictionary<string, string>();
                    arguments.Add("URL", customUrlActionNode.Url);

                    OpenHandledViewMessageQueueItem openHandledViewMessageQueueItem = new OpenHandledViewMessageQueueItem(
                        EntityTokenSerializer.Serialize(entityToken, true), 
                        "Composite.Management.Browser", 
                        arguments
                    );

                    ConsoleMessageQueueFacade.Enqueue(openHandledViewMessageQueueItem, currentConsoleId);                    
                    break;


                case CustomUrlActionNodeViewType.FileDownload:
                    DownloadFileMessageQueueItem downloadFileMessageQueueItem = new DownloadFileMessageQueueItem(customUrlActionNode.Url);

                    ConsoleMessageQueueFacade.Enqueue(downloadFileMessageQueueItem, currentConsoleId);                    
                    break;
            }


            return null;
        }
    }




    [ActionExecutor(typeof(CustomUrlActionNodeActionExecutor))]
    public sealed class CustomUrlActionNodeActionToken : ActionToken
    {
        private List<PermissionType> _permissionTypes;


        public CustomUrlActionNodeActionToken(string viewLabel, string viewToolTip, string serializedActionNode, List<PermissionType> permissionTypes)
        {
            this.ViewLabel = viewLabel;
            this.ViewToolTip = viewToolTip;
            _permissionTypes = permissionTypes;
            this.SerializedActionNode = serializedActionNode;
        }


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
                StringConversionServices.DeserializeValueString(dic["ViewLabel"]),
                StringConversionServices.DeserializeValueString(dic["ViewToolTip"]),
                StringConversionServices.DeserializeValueString(dic["SerializedActionNode"]),
                StringConversionServices.DeserializeValueString(dic["PermissionTypes"]).DesrializePermissionTypes().ToList()
            );
        }
    }
}
