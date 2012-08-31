using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web.UI;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Plugins.Elements.ElementProviders.Common;
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;
using Composite.Plugins.PageTemplates.MasterPages;

namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditMasterPageWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string LogTitle = typeof (EditMasterPageWorkflow).Name;
        // private static readonly string HtmlMimeType = "text/html";

        private string[] GetFiles()
        {
            var entityToken = this.EntityToken;

            if (entityToken is PageTemplateEntityToken)
            {
                var masterTemplate = GetPageTemplate();

                return masterTemplate.GetFiles();
            }

            if (entityToken is SharedCodeFileEntityToken)
            {
                var sharedFileEntityToken = (SharedCodeFileEntityToken)this.EntityToken;

                string relativeFilePath = sharedFileEntityToken.VirtualPath;

                // Security check that validates that the file is a Shared code file 
                var sharedFiles = PageTemplateFacade.GetSharedFiles();

                Verify.That(sharedFiles.Any(sharedFile => string.Compare(sharedFile.RelativeFilePath, relativeFilePath, StringComparison.OrdinalIgnoreCase) == 0),
                            "There's no page template provider that would claim ownership over shared code file '{0}'");

                string fullPath = PathUtil.Resolve(relativeFilePath);
                string codebehindFile = MasterPagePageTemplateProvider.GetCodebehindFilePath(fullPath);

                var result = new List<string>();
                result.Add(fullPath);

                if(codebehindFile != null)
                {
                    result.Add(codebehindFile);
                }

                return result.ToArray();
            }

            throw new InvalidOperationException("Invalid entity token type '{0}'".FormatWith(entityToken.GetType().Name));
        }

        private Guid GetTemplateId()
        {
            var entityToken = this.EntityToken;
            Verify.That(entityToken is PageTemplateEntityToken, "Invalid entity token type '{0}'", entityToken.GetType());

            var pageTemplateEntityToken = (PageTemplateEntityToken)entityToken;
            return pageTemplateEntityToken.TemplateId;
        }

        private MasterPagePageTemplateDescriptor GetPageTemplate()
        {
            Guid templateId = GetTemplateId();

            var template = PageTemplateFacade.GetPageTemplates().FirstOrDefault(t => t.Id == templateId);
            Verify.IsNotNull(template, "Faile to find page template by ID '{0}'", templateId);

            return (MasterPagePageTemplateDescriptor)template;   
        }

        public EditMasterPageWorkflow()
        {
            InitializeComponent();
        }

        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            var entityToken = this.EntityToken;

            string title;

            if (entityToken is PageTemplateEntityToken)
            {
                title = GetPageTemplate().Title;
            }
            else
            {
                var sharedFileEntityToken = (SharedCodeFileEntityToken)entityToken;

                title = Path.GetFileName(sharedFileEntityToken.VirtualPath);
            }

            this.Bindings.Add("TemplateTitle", title);

            string[] files = GetFiles();

            // Binding all the files
            for(int i=0; i<files.Length; i++)
            {
                var websiteFile = new WebsiteFile(files[i]);

                string bindingPrefix = GetBindingPrefix(i);

                this.Bindings.Add(bindingPrefix + "Content", websiteFile.ReadAllText());
                this.Bindings.Add(bindingPrefix + "Name", websiteFile.FileName);
                // Assigning "text/html" mimetype so CodeMirror will show it correctly

                // this.Bindings.Add(bindingPrefix + "MimeType", i == 0 ? HtmlMimeType : websiteFile.MimeType);
                this.Bindings.Add(bindingPrefix + "MimeType", websiteFile.MimeType);
            }
        }


        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string[] files = GetFiles();

            var fileContent = new List<string>();

            for (int i = 0; i < files.Length; i++)
            {
                string bindingPrefix = GetBindingPrefix(i);

                fileContent.Add(this.GetBinding<string>(bindingPrefix + "Content"));
            }

            // Fixing html specific escape sequences in .master file
            string fixedMaster = PageTemplateHelper.FixHtmlEscapeSequences(fileContent[0]);
            bool viewNeedsUpdating = fileContent[0] != fixedMaster;
            fileContent[0] = fixedMaster;


            EntityToken newEntityToken;
            if (!CompileAndValidate(files, fileContent, out newEntityToken))
            {
                SetSaveStatus(false);
                return;
            }

            for (int i = 0; i < files.Length; i++)
            {
                var websiteFile = new WebsiteFile(files[i]);

                websiteFile.WriteAllText(fileContent[i]);
            }

            PageTemplateProviderRegistry.FlushTemplates();

            if (newEntityToken != null)
            {
                SetSaveStatus(true, newEntityToken);

                SerializedEntityToken = EntityTokenSerializer.Serialize(newEntityToken);
            }
            else
            {
                SetSaveStatus(true);
            }

            if(viewNeedsUpdating)
            {
                UpdateBinding(GetBindingPrefix(0) + "Content", fixedMaster);
                RerenderView();
            }

            this.CreateParentTreeRefresher().PostRefreshMesseges(this.EntityToken);
        }

        private static string GetBindingPrefix(int zeroBasedFileNumber)
        {
            return "File" + (zeroBasedFileNumber + 1);
        }

        private bool CompileAndValidate(string[] files, IList<string> fileContent, out EntityToken newEntityToken)
        {
            string tempMasterFile = GetTempFilePath(files[0]);
            string tempCodeBehindFile = null; 

            string tempMasterFileContent = fileContent[0];

            if(files.Length > 1)
            {
                tempCodeBehindFile = GetTempFilePath(files[1]);

                string originalCsFileName = Path.GetFileName(files[1]);
                string newCsFileName = Path.GetFileName(tempCodeBehindFile);

                // Fixing the refecence to the CS file in the temporary created .master file so it will point
                // to the temporary CS file. Just string.Replace, writing a sofisticated parser would be overkill

                int offset = tempMasterFileContent.IndexOf(originalCsFileName, StringComparison.OrdinalIgnoreCase);

                if(offset > 0)
                {
                    tempMasterFileContent = tempMasterFileContent.Substring(0, offset)
                                            + newCsFileName
                                            + tempMasterFileContent.Substring(offset + originalCsFileName.Length);
                }
            }

            try
            {
                File.WriteAllText(tempMasterFile, tempMasterFileContent); 

                if(tempCodeBehindFile != null)
                {
                    File.WriteAllText(tempCodeBehindFile, fileContent[1]); 
                }

                string virtualPath = "~" + PathUtil.GetWebsitePath(tempMasterFile);


                MasterPage masterPage;

                try
                {
                    masterPage = CompilationHelper.CompileMasterPage(virtualPath);
                }
                catch(Exception ex)
                {
                    Log.LogWarning(LogTitle, "Failed to compile master page");
                    Log.LogWarning(LogTitle, ex);

                    Exception compilationException = (ex is TargetInvocationException) ? ex.InnerException : ex;

                    // Replacing file path and temp file name from error message as it is irrelevant to the user
                    string masterFileName = Path.GetFileName(files[0]);
                    string errorMessage = compilationException.Message;
                    
                    if(errorMessage.StartsWith(tempMasterFile, StringComparison.OrdinalIgnoreCase))
                    {
                        errorMessage = masterFileName + errorMessage.Substring(tempMasterFile.Length);
                    }

                    ShowWarning(GetText("EditTemplate.Validation.CompilationFailed")
                                .FormatWith(errorMessage));

                    newEntityToken = null;
                    return false;
                }

                return Validate(masterPage, out newEntityToken);
            }
            finally
            {
                // Deleting temporary files
                File.Delete(tempMasterFile);
                if (tempCodeBehindFile != null)
                {
                    File.Delete(tempCodeBehindFile);
                }
            }
        }

        private bool Validate(MasterPage masterPage, out EntityToken newEntityToken)
        {
            newEntityToken = null;

            if(!(this.EntityToken is PageTemplateEntityToken))
            {
                return true;
            }

            var pageTemplate = GetPageTemplate();

            var templateDefinition = masterPage as MasterPagePageTemplate;
            if(templateDefinition == null)
            {
                if(!pageTemplate.IsValid)
                {
                    return true;
                }

                ShowWarning(GetText("EditTemplate.Validation.IncorrectBaseClass")
                            .FormatWith(typeof(MasterPagePageTemplate).FullName));
                return false;
            }

            Guid templateId;

            try
            {
                templateId = templateDefinition.TemplateId;
            }
            catch (Exception ex)
            {
                ShowPropertyError("TemplateId", ex);
                return false;
            }

            try
            {
                string newTitle = templateDefinition.TemplateTitle;
            }
            catch (Exception ex)
            {
                ShowPropertyError("TemplateTitle", ex);
                return false;
            }

            if(pageTemplate.IsValid)
            {
                if (templateId != pageTemplate.Id)
                {
                    ShowWarning(GetText("EditTemplate.Validation.TemplateIdChanged").FormatWith(pageTemplate.Id));
                    return false;
                }
            }
            else
            {
                newEntityToken = new PageTemplateEntityToken(templateId);
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

        private string GetText(string text)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.MasterPagePageTemplate", text);
        }


        private string GetTempFilePath(string filePath)
        {
            string fileName = Path.GetFileName(filePath);
            string folderPath = Path.GetDirectoryName(filePath);

            return Path.Combine(folderPath, "_temp_" + fileName);
        }
    }
}
