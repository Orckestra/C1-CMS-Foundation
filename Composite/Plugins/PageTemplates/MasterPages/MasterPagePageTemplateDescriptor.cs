using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web.UI;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider;
using Composite.Plugins.PageTemplates.Common;
using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

using Texts = Composite.Core.ResourceSystem.LocalizationFiles.Composite_Plugins_MasterPagePageTemplate;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    internal class MasterPagePageTemplateDescriptor : PageTemplateDescriptor
    {
        private static readonly PermissionType[] _editWebsiteFilePermissionTypes = new[] { PermissionType.Edit };

        private static readonly ResourceHandle EditTemplateIcon = new ResourceHandle(BuildInIconProviderName.ProviderName, "page-template-edit");
        public static ResourceHandle DeleteTemplateIcon { get { return PageTemplateElementProvider.GetIconHandle("page-template-delete"); } }
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);


        private readonly string _filePath;
        private readonly string _codeBehindFilePath;

        public MasterPagePageTemplateDescriptor(string filePath, string codeBehindFilePath)
        {
            Verify.ArgumentNotNull(filePath, "filePath");

            _filePath = filePath;
            _codeBehindFilePath = codeBehindFilePath;
        }

        public string FilePath { get { return _filePath; } }

        public string CodeBehindFilePath { get { return _codeBehindFilePath; } }

        public string[] GetFiles()
        {
            var result = new List<string>();
            result.Add(FilePath);

            if(CodeBehindFilePath != null)
            {
                result.Add(CodeBehindFilePath);
            }

            return result.ToArray();
        }

        public override IEnumerable<C1Console.Elements.ElementAction> GetActions()
        {
            var result = new List<ElementAction>();

            Type workflowType = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.EditMasterPageWorkflow");

            result.Add(new ElementAction(new ActionHandle(new WorkflowActionToken(
                workflowType,
                _editWebsiteFilePermissionTypes)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = Texts.EditMasterPageAction_Label,
                    ToolTip = Texts.EditMasterPageAction_ToolTip,
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
                    Label = Texts.DeleteMasterPageAction_Label,
                    ToolTip = Texts.DeleteMasterPageAction_ToolTip,
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
    }

    internal class LazyInitializedMasterPagePageTemplateDescriptor: MasterPagePageTemplateDescriptor
    {
        private readonly string LogTitle = typeof (LazyInitializedMasterPagePageTemplateDescriptor).Name;
        private readonly MasterPagePageTemplateProvider _provider;

        private bool _initialized;

        public LazyInitializedMasterPagePageTemplateDescriptor(string filePath, string codeBehindFilePath, Guid templateId, string templateTitle, MasterPagePageTemplateProvider provider)
            :base(filePath, codeBehindFilePath)
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
            MasterPage masterPage;
            MasterPagePageTemplateDescriptor parsedPageTemplateDescriptor;
            MasterPageRenderingInfo renderingInfo;
            Exception loadingException;

            if (!_provider.LoadMasterPage(
                FilePath,
                out masterPage,
                out parsedPageTemplateDescriptor,
                out renderingInfo,
                out loadingException))
            {
                this.LoadingException = loadingException;
                return;
            }

            Verify.IsNotNull(masterPage, "Failed to compile master page file '{0}'", FilePath);
            Verify.That(masterPage is MasterPagePageTemplate, "Incorrect base class. '{0}'", FilePath);

            
            this.DefaultPlaceholderId = parsedPageTemplateDescriptor.DefaultPlaceholderId;
            this.PlaceholderDescriptions = parsedPageTemplateDescriptor.PlaceholderDescriptions;
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
