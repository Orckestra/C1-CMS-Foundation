using System;
using System.IO;
using System.Linq;
using System.Web.WebPages;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;
using Composite.Plugins.PageTemplates.Razor;
using RazorPageTemplate = Composite.AspNet.Razor.RazorPageTemplate;

namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditRazorPageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string LogTitle = "Razor Edit";

        public EditRazorPageTemplateWorkflow()
        {
            InitializeComponent();
        }



        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string filePath = PathUtil.Resolve(GetFileVirtualPath());

            WebsiteFile websiteFile = new WebsiteFile(filePath);

            this.Bindings.Add("FilePath", filePath);
            this.Bindings.Add("FileContent", websiteFile.ReadAllText());
            this.Bindings.Add("FileName", websiteFile.FileName);
            this.Bindings.Add("FileMimeType", websiteFile.MimeType);
        }



        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string virtualPath = GetFileVirtualPath();
            string filePath = PathUtil.Resolve(virtualPath);

            WebsiteFile websiteFile = new WebsiteFile(filePath);

            string content = this.GetBinding<string>("FileContent");

            EntityToken newEntityToken;
            bool isValid = ValidateMarkup(virtualPath, content, out newEntityToken);

            if (isValid)
            {
                websiteFile.WriteAllText(content);

                PageTemplateProviderRegistry.FlushTemplates();

                this.CreateParentTreeRefresher().PostRefreshMesseges(this.EntityToken);
            }

            if (isValid && newEntityToken != null)
            {
                SetSaveStatus(true, newEntityToken);

                SerializedEntityToken = EntityTokenSerializer.Serialize(newEntityToken);
            }
            else
            {
                SetSaveStatus(isValid);
            }
        }


        private bool ValidateMarkup(string virtualPath, string content, out EntityToken newEntityToken)
        {
            newEntityToken = null;

            string filePath = PathUtil.Resolve(virtualPath);
            string fileName = Path.GetFileName(filePath);

            string tempFileName = "_tmp_" + fileName;
            string tempFileVirtualPath = virtualPath.Substring(0, virtualPath.Length - fileName.Length) + tempFileName;
            string tempFile = Path.Combine(Path.GetDirectoryName(filePath), tempFileName);

            try
            {
                C1File.WriteAllText(tempFile, content);

                WebPageBase webPageBase;

                try
                {
                    webPageBase = WebPage.CreateInstanceFromVirtualPath(tempFileVirtualPath);
                }
                catch (Exception ex)
                {
                    Log.LogWarning(LogTitle, "Compilation failed while validating changes to '{0}'", virtualPath);
                    Log.LogWarning(LogTitle, ex);

                    string message = ex.Message;

                    if(message.StartsWith(tempFile, StringComparison.OrdinalIgnoreCase))
                    {
                        message = fileName + message.Substring(tempFile.Length);
                    }

                    ShowWarning(GetText("EditTemplate.Validation.CompilationFailed")
                                .FormatWith(message));
                    return false;
                }

                if (!(webPageBase is RazorPageTemplate))
                {
                    if(IsPageTemplate) 
                    {
                        var templateDescriptor = GetPageTemplateDescriptor();
                        
                        if(templateDescriptor.IsValid)
                        {
                            ShowWarning(GetText("EditTemplate.Validation.IncorrectBaseClass")
                                    .FormatWith(typeof(RazorPageTemplate).FullName));
                            return false;    
                        }

                        newEntityToken = new SharedCodeFileEntityToken(virtualPath);
                        return true;
                    }

                    return true;
                }

                Guid templateId;
                string templateTitle, templateDescription;

                var pageTemplate = webPageBase as RazorPageTemplate;

                try
                {
                    templateId = pageTemplate.TemplateId;
                }
                catch (Exception ex)
                {
                    ShowPropertyError("TemplateId", ex);
                    return false;
                }

                try
                {
                    templateTitle = pageTemplate.TemplateTitle;
                }
                catch (Exception ex)
                {
                    ShowPropertyError("TemplateTitle", ex);
                    return false;
                }

                try
                {
                    templateDescription = pageTemplate.TemplateDescription;
                }
                catch (Exception ex)
                {
                    ShowPropertyError("TemplateDescription", ex);
                    return false;
                }

                

                if(!IsPageTemplate)
                {
                    newEntityToken = new PageTemplateEntityToken(templateId);
                    return true;
                }

                var pageTemplateDescriptor = GetPageTemplateDescriptor();

                if (pageTemplateDescriptor.IsValid)
                {
                    // Forbidding to change template id from this workflow in order to avoid mistakes
                    if (templateId != pageTemplateDescriptor.Id)
                    {
                        ShowWarning(GetText("EditTemplate.Validation.TemplateIdChanged").FormatWith(pageTemplateDescriptor.Id));
                        return false;
                    }
                }
                else
                {
                    newEntityToken = new PageTemplateEntityToken(templateId);
                }
            }
            finally
            {
                C1File.Delete(tempFile);
            }

            return true;
        }


        private void ShowPropertyError(string propertyName, Exception ex)
        {
            ShowWarning(GetText("EditTemplate.Validation.PropertyError")
                        .FormatWith(propertyName, ex.Message));
        }


        private void ShowWarning(string warning)
        {
            this.ShowMessage(DialogType.Warning,
                 GetText("EditTemplate.Validation.DialogTitle"),
                 warning);
        }

        private Guid GetTemplateId()
        {
            var entityToken = this.EntityToken;
            Verify.That(entityToken is PageTemplateEntityToken, "Invalid entity token type '{0}'", entityToken.GetType());

            var pageTemplateEntityToken = (PageTemplateEntityToken)entityToken;
            return pageTemplateEntityToken.TemplateId;
        }

        private string GetText(string text)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorPageTemplate", text);
        }

        private RazorPageTemplateDescriptor GetPageTemplateDescriptor()
        {
            Guid templateId = GetTemplateId();

            var template = PageTemplateFacade.GetPageTemplates().FirstOrDefault(t => t.Id == templateId);
            Verify.IsNotNull(template, "Faile to find page template by ID '{0}'", templateId);

            return (PageTemplates.Razor.RazorPageTemplateDescriptor)template;
        }

        private bool IsPageTemplate
        {
            get { return this.EntityToken is PageTemplateEntityToken; }
        }

        private string GetFileVirtualPath()
        {
            if(IsPageTemplate)
            {
                return GetPageTemplateDescriptor().VirtualPath;
            }

            if(EntityToken is SharedCodeFileEntityToken)
            {
                return (EntityToken as SharedCodeFileEntityToken).VirtualPath;
            }
            
            throw new InvalidOperationException("Unexpected entity token type " + EntityToken.GetType().FullName);
        }
    }
}
