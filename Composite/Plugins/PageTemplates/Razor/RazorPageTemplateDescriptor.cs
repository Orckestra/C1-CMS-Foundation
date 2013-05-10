using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web.WebPages;
using Composite.AspNet.Razor;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider;
using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.PageTemplates.Razor
{
    internal class RazorPageTemplateDescriptor: PageTemplateDescriptor
    {
        private static readonly PermissionType[] _editWebsiteFilePermissionTypes = new [] { PermissionType.Edit };

        private static readonly ResourceHandle EditTemplateIcon = new ResourceHandle(BuildInIconProviderName.ProviderName, "page-template-edit");
        public static ResourceHandle DeleteTemplateIcon { get { return PageTemplateElementProvider.GetIconHandle("page-template-delete"); } }
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        private readonly string _virtualPath;

        public RazorPageTemplateDescriptor(string virtualPath)
        {
            _virtualPath = virtualPath;
        }

        public string VirtualPath { get { return _virtualPath; } }

        public override IEnumerable<ElementAction> GetActions()
        {
            var result = new List<ElementAction>();

            Type workflowType = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.EditRazorPageTemplateWorkflow");

            result.Add(new ElementAction(new ActionHandle(new WorkflowActionToken(
                workflowType,
                _editWebsiteFilePermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = GetText("EditRazorTemplateAction.Label"),
                    ToolTip = GetText( "EditRazorTemplateAction.ToolTip"),
                    Icon = EditTemplateIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Edit,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });

            workflowType = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.DeletePageTemplateWorkflow");

            result.Add(new ElementAction(new ActionHandle(new WorkflowActionToken(workflowType, new[] { PermissionType.Delete })))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = GetText("DeleteRazorPageTemplateAction.Label"),
                    ToolTip = GetText("DeleteRazorPageTemplateAction.ToolTip"),
                    Icon = DeleteTemplateIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Delete,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });

            return result;
        }

        private static string GetText(string stringId)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorPageTemplate", stringId);
        }
    }

    internal class LazyInitializedRazorPageTemplateDescriptor : RazorPageTemplateDescriptor
    {
                private readonly RazorPageTemplateProvider _provider;

        private bool _initialized;

        public LazyInitializedRazorPageTemplateDescriptor(
            string virtualPath, 
            Guid templateId, 
            string templateTitle, 
            RazorPageTemplateProvider provider)
            : base(virtualPath)
        {
            Id = templateId;
            Title = templateTitle;
            _provider = provider;
        }

        private void EnsureInitialize()
        {
            if (!_initialized)
            {
                lock (this)
                {
                    if (!_initialized)
                    {
                        Initialize();

                        _initialized = true;
                    }
                }
            }
        }

        private void Initialize()
        {
            WebPageBase webPage;
            PageTemplateDescriptor parsedTemplate;
            IDictionary<string, PropertyInfo> placeholderProperties;
            Exception loadingException;

            if (!_provider.LoadRazorTemplate(VirtualPath, out webPage, out parsedTemplate, out placeholderProperties, out loadingException))
            {
                LoadingException = loadingException;
                _initialized = true;
                throw loadingException;
            }

            Verify.IsNotNull(webPage, "Failed to compile razor page template '{0}'", VirtualPath);
            Verify.That(webPage is RazorPageTemplate, "Incorrect base class. '{0}'", VirtualPath);


            this.DefaultPlaceholderId = parsedTemplate.DefaultPlaceholderId;
            this.PlaceholderDescriptions = parsedTemplate.PlaceholderDescriptions;
        }

        public override IEnumerable<PlaceholderDescriptor> PlaceholderDescriptions
        {
            get
            {
                EnsureInitialize();

                return base.PlaceholderDescriptions;
            }
            set
            {
                base.PlaceholderDescriptions = value;
            }
        }

        public override string DefaultPlaceholderId
        {
            get
            {
                EnsureInitialize();

                return base.DefaultPlaceholderId;
            }
            set
            {
                base.DefaultPlaceholderId = value;
            }
        }

        public override Exception LoadingException
        {
            get
            {
                EnsureInitialize();

                return base.LoadingException;
            }
            set
            {
                base.LoadingException = value;
            }
        }

        public override bool IsValid
        {
            get
            {
                EnsureInitialize();

                return base.IsValid;
            }
        }

    }
}
