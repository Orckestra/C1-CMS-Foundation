using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Composite.C1Console.Events;
using Composite.C1Console.Elements;
using Composite.Functions.Foundation;
using Composite.Core.ResourceSystem;
using Composite.C1Console.Security;
using Composite.Core.Types;
using Composite.Core.Xml;


namespace Composite.C1Console.Trees.Foundation
{
    internal static class ActionNodeCreatorFactory
    {
        private static readonly string DefaultAddDataResourceName = "generated-type-data-add";
        private static readonly string DefaultEditDataResourceName = "generated-type-data-edit";
        private static readonly string DefaultDeleteDataResourceName = "generated-type-data-delete";
        private static readonly string DefaultReportFunctionResourceName = "reportfunctionaction-defaulticon";
        private static readonly string DefaultMessageBoxResourceName = "messageboxaction-defaulticon";
        private static readonly string DefaultCustomUrlResourceName = "customurlaction-defaulticon";
        private static readonly string DefaultConfirmResourceName = "confirmaction-defaulticon";
        private static readonly string DefaultWorkflowResourceName = "workflowaction-defaulticon";


        private static readonly List<PermissionType> DefaultAddPermissionTypes = new List<PermissionType> { PermissionType.Add };
        private static readonly List<PermissionType> DefaultEditPermissionTypes = new List<PermissionType> { PermissionType.Edit };
        private static readonly List<PermissionType> DefaultDeletePermissionTypes = new List<PermissionType> { PermissionType.Delete };


        public static ActionNode CreateActionNode(XElement element, Tree tree)
        {
            if (element.Name == TreeMarkupConstants.Namespace + "AddDataAction")
            {
                GenericAddDataActionNode actionNode = new GenericAddDataActionNode();
                InitializeWithCommonValue(element, tree, actionNode, DefaultAddDataResourceName, StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "GenericAddDataAction.DefaultLabel"), ActionLocation.AddPrimaryActionLocation, DefaultAddPermissionTypes);

                XAttribute typeAttribute = element.Attribute("Type");
                XAttribute customFormMarkupAttribute = element.Attribute("CustomFormMarkupPath");

                if (typeAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Type");
                }
                else
                {
                    actionNode.InterfaceType = TypeManager.TryGetType(typeAttribute.Value);
                    if (actionNode.InterfaceType == null) tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.UnkownInterfaceType", typeAttribute.Value);
                }

                actionNode.CustomFormMarkupPath = customFormMarkupAttribute.GetValueOrDefault(null);

                return actionNode;
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "EditDataAction")
            {
                GenericEditDataActionNode actionNode = new GenericEditDataActionNode();
                InitializeWithCommonValue(element, tree, actionNode, DefaultEditDataResourceName, StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "GenericEditDataAction.DefaultLabel"), ActionLocation.EditPrimaryActionLocation, DefaultEditPermissionTypes);

                XAttribute customFormMarkupAttribute = element.Attribute("CustomFormMarkupPath");

                actionNode.CustomFormMarkupPath = customFormMarkupAttribute.GetValueOrDefault(null);

                return actionNode;
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "DeleteDataAction")
            {
                GenericDeleteDataActionNode actionNode = new GenericDeleteDataActionNode();
                InitializeWithCommonValue(element, tree, actionNode, DefaultDeleteDataResourceName, StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "GenericDeleteDataAction.DefaultLabel"), ActionLocation.DeletePrimaryActionLocation, DefaultDeletePermissionTypes);

                return actionNode;
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "ReportFunctionAction")
            {
                ReportFunctionActionNode actionNode = new ReportFunctionActionNode();
                InitializeWithCommonValue(element, tree, actionNode, DefaultReportFunctionResourceName);

                XAttribute documentLabelAttribute = element.Attribute("DocumentLabel");
                XAttribute documentIconAttribute = element.Attribute("DocumentIcon");

                XElement functionMarkupElement = element.Element((XNamespace)FunctionTreeConfigurationNames.NamespaceName + FunctionTreeConfigurationNames.FunctionTagName);
                if (functionMarkupElement == null) tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingFunctionMarkup");
                actionNode.FunctionMarkup = functionMarkupElement;

                actionNode.DocumentLabel = documentLabelAttribute.GetValueOrDefault(actionNode.Label);
                if (documentIconAttribute != null)
                {
                    actionNode.DocumentIcon = FactoryHelper.GetIcon(documentIconAttribute.Value);
                }
                else
                {
                    actionNode.DocumentIcon = actionNode.Icon;
                }

                return actionNode;
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "MessageBoxAction")
            {
                MessageBoxActionNode actionNode = new MessageBoxActionNode();
                InitializeWithCommonValue(element, tree, actionNode, DefaultMessageBoxResourceName);

                XAttribute messageBoxTitleAttribute = element.Attribute("MessageBoxTitle");
                XAttribute messageBoxMessageAttribute = element.Attribute("MessageBoxMessage");

                if (messageBoxTitleAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "MessageBoxTitle");
                }
                else
                {
                    actionNode.Title = messageBoxTitleAttribute.Value;
                }

                if (messageBoxMessageAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "MessageBoxMessage");
                }
                else
                {
                    actionNode.Message = messageBoxMessageAttribute.Value;
                }

                XAttribute dialogTypeAttribute = element.Attribute("MessageDialogType");
                string dialogTypeValue = dialogTypeAttribute.GetValueOrDefault("message");
                switch (dialogTypeValue)
                {
                    case "message": 
                        actionNode.DialogType = DialogType.Message;
                        break;

                    case "question":
                        actionNode.DialogType = DialogType.Question;
                        break;

                    case "warning":
                        actionNode.DialogType = DialogType.Warning;
                        break;

                    case "error":
                        actionNode.DialogType = DialogType.Error;
                        break;

                    default:
                        tree.AddValidationError(element.GetXPath(), "TreeValidationError.MessageBoxAction.UnknownDialogType", dialogTypeValue);
                        break;
                }

                return actionNode;
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "CustomUrlAction")
            {
                CustomUrlActionNode actionNode = new CustomUrlActionNode();
                InitializeWithCommonValue(element, tree, actionNode, DefaultCustomUrlResourceName);

                XAttribute urlAttribute = element.Attribute("Url");
                XAttribute viewLabelAttribute = element.Attribute("ViewLabel");
                XAttribute viewToolTipAttribute = element.Attribute("ViewToolTip");
                XAttribute viewIconAttribute = element.Attribute("ViewIcon");

                IEnumerable<XElement> postParameterElements = element.Elements(TreeMarkupConstants.Namespace + "PostParameters");
                XElement postParametersElement = null;
                if (postParameterElements.Count() == 1)
                {
                    postParametersElement = element.Element(TreeMarkupConstants.Namespace + "PostParameters");
                }
                else if (postParameterElements.Count() > 1)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.CustomUrlAction.TooManyPostParameterElements", "PostParameters");
                }

                if (urlAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Url");
                }
                else
                {
                    actionNode.Url = urlAttribute.Value;
                }

                actionNode.ViewLabel = viewLabelAttribute.GetValueOrDefault(actionNode.Label);
                actionNode.ViewToolTip = viewToolTipAttribute.GetValueOrDefault(actionNode.ToolTip);
                actionNode.ViewIcon = FactoryHelper.GetIcon(viewIconAttribute.GetValueOrDefault(DefaultCustomUrlResourceName));

                bool urlIsAbsolute = actionNode.Url != null && actionNode.Url.Contains("://");

                XAttribute viewTypeAttribute = element.Attribute("ViewType");
                string viewTypeValue = viewTypeAttribute.GetValueOrDefault(urlIsAbsolute ? "externalview" : "documentview");
                switch (viewTypeValue)
                {
                    case "externalview":
                        actionNode.ViewType = CustomUrlActionNodeViewType.ExternalView;
                        break;

                    case "genericview":
                        actionNode.ViewType = CustomUrlActionNodeViewType.GenericView;
                        break;

                    case "pagebrowser":
                        actionNode.ViewType = CustomUrlActionNodeViewType.PageBrowser;
                        break;

                    case "filedownload":
                        actionNode.ViewType = CustomUrlActionNodeViewType.FileDownload;
                        break;

                    case "documentview":
                        actionNode.ViewType = CustomUrlActionNodeViewType.DocumentView;
                        break;

                    default:
                        tree.AddValidationError(element.GetXPath(), "TreeValidationError.CustomUrlAction.UnknownViewType", viewTypeValue);
                        break;
                }

                actionNode.PostParameters = new Dictionary<string, string>();
                if (postParametersElement != null)
                {
                    foreach (XElement parameterElement in postParametersElement.Elements(TreeMarkupConstants.Namespace + "Parameter"))
                    {
                        XAttribute keyAttribute = parameterElement.Attribute("Key");
                        XAttribute valueAttribute = parameterElement.Attribute("Value");

                        if (keyAttribute == null)
                        {
                            tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Key");
                            continue;
                        }
                        else if (string.IsNullOrWhiteSpace(keyAttribute.Value) == true)
                        {
                            tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.WrongAttributeValue", "Key");
                            continue;                            
                        }

                        if (valueAttribute == null)
                        {
                            tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Value");
                            continue;
                        }

                        actionNode.PostParameters.Add(keyAttribute.Value, valueAttribute.Value);
                    }
                }

                return actionNode;
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "ConfirmAction")
            {
                ConfirmActionNode actionNode = new ConfirmActionNode();
                InitializeWithCommonValue(element, tree, actionNode, DefaultConfirmResourceName);

                XAttribute confirmTitleAttribute = element.Attribute("ConfirmTitle");
                XAttribute confirmMessageAttribute = element.Attribute("ConfirmMessage");

                if (confirmTitleAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "ConfirmTitle");
                }
                else
                {
                    actionNode.ConfirmTitle = confirmTitleAttribute.Value;
                }

                if (confirmMessageAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "ConfirmMessage");
                }
                else
                {
                    actionNode.ConfirmMessage = confirmMessageAttribute.Value;
                }

                XElement functionMarkupElement = element.Element((XNamespace)FunctionTreeConfigurationNames.NamespaceName + FunctionTreeConfigurationNames.FunctionTagName);
                if (functionMarkupElement == null) tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingFunctionMarkup");
                actionNode.FunctionMarkup = functionMarkupElement;

                XAttribute refreshTreeAttribute = element.Attribute("RefreshTree");
                string refreshTreeAttributeValue = refreshTreeAttribute.GetValueOrDefault("false").ToLowerInvariant();
                if (refreshTreeAttributeValue == "true")
                {
                    actionNode.RefreshTree = true;
                }
                else
                {
                    actionNode.RefreshTree = false;
                }                

                return actionNode;
            }
            else if (element.Name == TreeMarkupConstants.Namespace + "WorkflowAction")
            {
                WorkflowActionNode actionNode = new WorkflowActionNode();
                InitializeWithCommonValue(element, tree, actionNode, DefaultWorkflowResourceName);

                XAttribute workflowTypeAttribute = element.Attribute("WorkflowType");                

                if (workflowTypeAttribute == null)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "ConfirmTitle");
                }
                else
                {
                    actionNode.WorkflowType = TypeManager.TryGetType(workflowTypeAttribute.Value);
                    if (actionNode.WorkflowType == null) tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.UnkownInterfaceType", workflowTypeAttribute.Value);
                }
                
                return actionNode;
            }
            else
            {
                tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.UnknownElement", element.Name);

                return null;
            }
        }



        private static void InitializeWithCommonValue(XElement element, Tree tree, ActionNode actionNode, string defaultIconName, string defaultLabelName = null, ActionLocation defaultActionLocation = null, List<PermissionType> defaultPermissionTypes = null)
        {
            XAttribute labelAttribute = element.Attribute("Label");
            XAttribute toolTipAttribute = element.Attribute("ToolTip");
            XAttribute iconAttribute = element.Attribute("Icon");

            if ((defaultLabelName == null) && (labelAttribute == null)) tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.MissingAttribute", "Label");

            actionNode.XPath = element.GetXPath();
            actionNode.Id = tree.BuildProcessContext.ActionIdCounter++;
            actionNode.Label = labelAttribute.GetValueOrDefault(defaultLabelName);
            actionNode.ToolTip = toolTipAttribute.GetValueOrDefault(actionNode.Label);
            actionNode.Icon = FactoryHelper.GetIcon(iconAttribute.GetValueOrDefault(defaultIconName));
            actionNode.Location = GetActionLocation(element, tree, defaultActionLocation);
            if (defaultPermissionTypes != null)
            {
                actionNode.PermissionTypes = defaultPermissionTypes;
            }
            else
            {
                actionNode.PermissionTypes = GetPermissionTypes(element, tree);
            }
        }



        public static List<PermissionType> GetPermissionTypes(XElement element, Tree tree, List<PermissionType> defaultPermissionTypes = null)
        {
            XAttribute permissionTypesAttribute = element.Attribute("PermissionTypes");
            if ((permissionTypesAttribute == null) && (defaultPermissionTypes != null)) return defaultPermissionTypes;

            string permissionTypesString = permissionTypesAttribute.GetValueOrDefault("read");

            string[] permissionTypesStrings = permissionTypesString.Split(',');

            List<PermissionType> permissionTypes = new List<PermissionType>();
            foreach (string permission in permissionTypesStrings)
            {                
                PermissionType permissionType;
                if (Enum.TryParse<PermissionType>(permission.Trim(), true, out permissionType) == false)
                {
                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.WrongPermissinValue", permission.Trim());
                    
                    continue;
                }

                permissionTypes.Add(permissionType);
            }

            return permissionTypes;
        }



        public static ActionLocation GetActionLocation(XElement element, Tree tree, ActionLocation defaultActionLocation = null)
        {
            XAttribute locationAttribute = element.Attribute("Location");

            if (locationAttribute == null) return ActionLocation.OtherPrimaryActionLocation;

            switch (locationAttribute.Value)
            {
                case "Add":
                    return ActionLocation.AddPrimaryActionLocation;

                case "Edit":
                    return ActionLocation.EditPrimaryActionLocation;

                case "Delete":
                    return ActionLocation.DeletePrimaryActionLocation;

                case "Other":
                    return ActionLocation.OtherPrimaryActionLocation;

                default:
                    if (defaultActionLocation != null) return defaultActionLocation;

                    tree.AddValidationError(element.GetXPath(), "TreeValidationError.Common.WrongLocationValue", locationAttribute.Value);

                    return ActionLocation.OtherPrimaryActionLocation;
            }
        }
    }
}
