using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web.UI;
using Composite.C1Console.Events;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;
using Composite.Plugins.PageTemplates.MasterPages;

namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [EntityTokenLock]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditMasterPageWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string LogTitle = typeof (EditMasterPageWorkflow).Name;

        private string[] GetFiles()
        {
            var entityToken = this.EntityToken;

            if (entityToken is PageTemplateEntityToken)
            {
                var masterTemplate = GetPageTemplate();

                return masterTemplate.GetFiles();
            }

            if(entityToken is SharedCodeFolderEntityToken)
            {
                /*
                var entityToken = (SharedCodeFileEntityToken)this.EntityToken;

                string relativeFilePath = entityToken.RelativeFilePath;

                // Security check that validates that the file is a Shared code file 
                var sharedFiles = PageTemplateFacade.GetSharedFiles();

                Verify.That(sharedFiles.Any(filePath => string.Compare(filePath, relativeFilePath, StringComparison.OrdinalIgnoreCase) == 0),
                            "There's no page template provider that would claim ownership over shared code file '{0}'");

                return PathUtil.Resolve(relativeFilePath); */                
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

        private MasterPageTemplate GetPageTemplate()
        {
            Guid templateId = GetTemplateId();

            var template = PageTemplateFacade.GetPageTemplates().FirstOrDefault(t => t.Id == templateId);
            Verify.IsNotNull(template, "Faile to find page template by ID '{0}'", templateId);

            return (MasterPageTemplate)template;   
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
                title = "."; // TODO: implement
            }

            this.Bindings.Add("TemplateTitle", title);

            string[] files = GetFiles();

            // Binding all the files
            for(int i=0; i<files.Length; i++)
            {
                var websiteFile = new WebsiteFile(files[i]);

                string bindingPrefix = "File" + (i + 1);

                this.Bindings.Add(bindingPrefix + "Content", websiteFile.ReadAllText());
                this.Bindings.Add(bindingPrefix + "Name", websiteFile.FileName);
                this.Bindings.Add(bindingPrefix + "MimeType", websiteFile.MimeType);
            }
        }


        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            string[] files = GetFiles();

            var fileContent = new List<string>();

            for (int i = 0; i < files.Length; i++)
            {
                string bindingPrefix = "File" + (i + 1);

                fileContent.Add(this.GetBinding<string>(bindingPrefix + "Content"));
            }

            if (!CompileAndValidate(files, fileContent))
            {
                return;
            }

            for (int i = 0; i < files.Length; i++)
            {
                var websiteFile = new WebsiteFile(files[i]);

                websiteFile.WriteAllText(fileContent[i]);
            }

            SetSaveStatus(true);
        }

        private bool CompileAndValidate(string[] files, IList<string> fileContent)
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

                    return false;
                }

                return Validate(masterPage);
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

        private bool Validate(MasterPage masterPage)
        {
            if(!(this.EntityToken is PageTemplateEntityToken))
            {
                return true;
            }

            var templateDefinition = masterPage as MasterPagePageTemplate;
            if(templateDefinition == null)
            {
                ShowWarning(GetText("EditTemplate.Validation.IncorrectBaseClass")
                            .FormatWith(typeof(MasterPagePageTemplate).FullName));
                return false;
            }

            Guid newTemplateId;

            try
            {
                newTemplateId = templateDefinition.TemplateId;
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

            try
            {
                string newDescription = templateDefinition.TemplateDescription;
            }
            catch (Exception ex)
            {
                ShowPropertyError("TemplateDescription", ex);
                return false;
            }

            Guid templateId = (this.EntityToken as PageTemplateEntityToken).TemplateId;

            // Placeholder validation also can be made
            if (newTemplateId != templateId)
            {
                ShowWarning(GetText("EditTemplate.Validation.TemplateIdChanged").FormatWith(templateId));
                return false;
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
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", text);
        }


        private string GetTempFilePath(string filePath)
        {
            string fileName = Path.GetFileName(filePath);
            string folderPath = Path.GetDirectoryName(filePath);

            return Path.Combine(folderPath, "_temp_" + fileName);
        }
    }
}
