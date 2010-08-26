using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.Types;
using Composite.C1Console.Workflow;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper.Foundation;


namespace Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class VisualFunctionElementProviderHelper
    {
        private ResourceHandle AddRenderingFunctionIcon { get { return GetIconHandle("visual-function-add"); } }
        private ResourceHandle EditRenderingFunctionIcon { get { return GetIconHandle("visual-function-edit"); } }
        private ResourceHandle DeleteRenderingFunctionIcon { get { return GetIconHandle("visual-function-delete"); } }

        private static readonly ActionGroup AppendedActionGroup = new ActionGroup("Visual Functions", ActionGroupPriority.TargetedAppendMedium);
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);


        public static IEnumerable<RenderingFunctionNames> GetRenderingFunctions(Type interfaceType)
        {
            string serializedType = TypeManager.SerializeType(interfaceType);

            var functions =
                (from wrf in DataFacade.GetData<IVisualFunction>()
                 where wrf.TypeManagerName == serializedType
                 select new { Name = wrf.Name, Namespace = wrf.Namespace }).ToList();

            IEnumerable<RenderingFunctionNames> renderingFunctins =
                from fun in functions
                select new RenderingFunctionNames
                {
                    Name = fun.Name,
                    Namespace = fun.Namespace,
                    CompositName = StringExtensionMethods.CreateNamespace(fun.Namespace, fun.Name, '.')
                };

            return renderingFunctins.OrderBy(f => f.CompositName);
        }



        public static IVisualFunction GetVisualFunction(RenderingFunctionNames renderingFunctionNames)
        {
            IVisualFunction function =
                (from wrf in DataFacade.GetData<IVisualFunction>()
                 where wrf.Name == renderingFunctionNames.Name &&
                       wrf.Namespace == renderingFunctionNames.Namespace
                 select wrf).FirstOrDefault();

            return function;
        }



        public void AttachElementActions(IEnumerable<Element> elements)
        {
            foreach (Element element in elements)
            {
                DataEntityToken dataEntityToken = element.ElementHandle.EntityToken as DataEntityToken;

                if (dataEntityToken != null)
                {
                    element.AddAction(
                        new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper.AddVisualFunctionWorkflow"))))
                            {
                                VisualData = new ActionVisualizedData
                                {
                                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "VisualFunctionElementProviderHelper.AddNewLabel"),
                                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "VisualFunctionElementProviderHelper.AddNewToolTip"),
                                    Icon = this.AddRenderingFunctionIcon,
                                    Disabled = false,
                                    ActionLocation = new ActionLocation
                                    {
                                        ActionType = ActionType.Add,
                                        IsInFolder = false,
                                        IsInToolbar = false,
                                        ActionGroup = AppendedActionGroup
                                    }
                                }
                            });

                    if (GetRenderingFunctions(dataEntityToken.Data.DataSourceId.InterfaceType).Count() > 0)
                    {
                        element.AddAction(
                            new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper.SelectVisualFunctionWorkflow")) { Payload = "Edit" }))
                            {
                                VisualData = new ActionVisualizedData
                                {
                                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "VisualFunctionElementProviderHelper.EditLabel"),
                                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "VisualFunctionElementProviderHelper.EditToolTip"),
                                    Icon = this.EditRenderingFunctionIcon,
                                    Disabled = false,
                                    ActionLocation = new ActionLocation
                                    {
                                        ActionType = ActionType.Edit,
                                        IsInFolder = false,
                                        IsInToolbar = false,
                                        ActionGroup = AppendedActionGroup
                                    }
                                }
                            });

                        element.AddAction(
                            new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.C1Console.Elements.ElementProviderHelpers.VisualFunctionElementProviderHelper.SelectVisualFunctionWorkflow")) { Payload = "Delete" }))
                            {
                                VisualData = new ActionVisualizedData
                                {
                                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "VisualFunctionElementProviderHelper.DeleteLabel"),
                                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.VisualFunction", "VisualFunctionElementProviderHelper.DeleteToolTip"),
                                    Icon = this.DeleteRenderingFunctionIcon,
                                    Disabled = false,
                                    ActionLocation = new ActionLocation
                                    {
                                        ActionType = ActionType.Delete,
                                        IsInFolder = false,
                                        IsInToolbar = true,
                                        ActionGroup = AppendedActionGroup
                                    }
                                }
                            });
                    }
                }
            }
        }


        private ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
