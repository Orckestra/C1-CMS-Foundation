using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using System.Web.UI;
using System.Workflow.Activities;
using System.Workflow.Runtime;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.C1Console.Forms;
using Composite.C1Console.Forms.DataServices;
using Composite.C1Console.Forms.Flows;
using Composite.C1Console.Security;
using Composite.C1Console.Trees;
using Composite.C1Console.Users;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.Linq;
using Composite.Core.PageTemplates;
using Composite.Core.ResourceSystem;
using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Core.Types;
using Composite.Core.WebClient.FlowMediators.FormFlowRendering;
using Composite.Core.WebClient.Renderings.Page;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.C1Console.Workflow.Foundation;

namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class EditPageWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        [NonSerialized]
        private bool _doPublish = false;

        public EditPageWorkflow()
        {
            InitializeComponent();
        }        



        private DataTypeDescriptorFormsHelper CreateDataTypeDescriptorFormsHelper(IPageMetaDataDefinition pageMetaDataDefinition, DataTypeDescriptor dataTypeDescriptor)
        {
            string bindingPrefix = string.Format("{0}:{1}.{2}", pageMetaDataDefinition.Name, dataTypeDescriptor.Namespace, dataTypeDescriptor.Name);

            DataTypeDescriptorFormsHelper helper = new DataTypeDescriptorFormsHelper(dataTypeDescriptor, bindingPrefix);

            GeneratedTypesHelper generatedTypesHelper = new GeneratedTypesHelper(dataTypeDescriptor);
            helper.AddReadOnlyFields(generatedTypesHelper.NotEditableDataFieldDescriptorNames);

            helper.FieldGroupLabel = StringResourceSystemFacade.ParseString(pageMetaDataDefinition.Label);

            return helper;
        }



        private List<KeyValuePair<Guid, string>> GetSelectablePageTypes()
        {
            IPage selectedPage = this.GetBinding<IPage>("SelectedPage");

            Guid parentPageId = selectedPage.GetParentId();
            IPage parentPage = null;
            if (parentPageId != Guid.Empty)
            {
                parentPage = Composite.Data.PageManager.GetPageById(parentPageId);
            }

            return
                parentPage.GetChildPageSelectablePageTypes(selectedPage).
                Select(f => new KeyValuePair<Guid, string>(f.Id, f.Name)).
                ToList();
        }



        private List<KeyValuePair<Guid, string>> GetSelectablePageTemplates()
        {
            IPage selectedPage = this.GetBinding<IPage>("SelectedPage");

            List<PageTemplateDescriptor> allPageTemplates = PageTemplateFacade.GetPageTemplates().ToList();

            List<Guid> templateRestrictions = 
                DataFacade.GetData<IPageTypePageTemplateRestriction>()
                .Where(f => f.PageTypeId == selectedPage.PageTypeId)
                .Select(restriction => restriction.PageTemplateId)
                .ToList();

            IEnumerable<PageTemplateDescriptor> result;

            if (templateRestrictions.Any())
            {
                var allowedTemplatesHash = new HashSet<Guid>(templateRestrictions);

                List<PageTemplateDescriptor> allowedTemplates =
                    allPageTemplates
                    .Where(template => allowedTemplatesHash.Contains(template.Id))
                    .ToList();

                Guid selectedTemplateId = selectedPage.TemplateId;
                PageTemplateDescriptor selectedTemplate = allPageTemplates.FirstOrDefault(t => t.Id == selectedTemplateId);
                if (selectedTemplate != null
                    & !allowedTemplates.Any(t => t.Id == selectedTemplateId))
                {
                    allowedTemplates.Add(selectedTemplate);
                }

                result = allowedTemplates;
            }
            else
            {
                result = allPageTemplates;
            }

            return result
                   .OrderBy(template => template.Title)
                   .Select(f => new KeyValuePair<Guid, string>(f.Id, f.Title)).ToList();
        }



        private void editStateCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            if (!PermissionsFacade.GetPermissionsForCurrentUser(EntityToken).Contains(PermissionType.Publish))
            {
                FormData formData = WorkflowFacade.GetFormData(InstanceId, true);

                if (formData.ExcludedEvents == null)
                    formData.ExcludedEvents = new List<string>();

                formData.ExcludedEvents.Add("SaveAndPublish");
            }


            IPage selectedPage;
            if (!this.BindingExist("SelectedPage"))
            {
                selectedPage = this.GetDataItemFromEntityToken<IPage>();
                selectedPage.PublicationStatus = GenericPublishProcessController.Draft;
                this.Bindings.Add("SelectedPage", selectedPage);
            }
            else
            {
                selectedPage = this.GetBinding<IPage>("SelectedPage");
            }

            if (!this.BindingExist("UrlTitleIsRequired"))
            {
                bool isRootPage = PageManager.GetParentId(selectedPage.Id) == Guid.Empty;

                this.Bindings["UrlTitleIsRequired"] = !isRootPage;
                this.Bindings["IsRootPage"] = isRootPage;
            }

            IFormMarkupProvider markupProvider = new FormDefinitionFileMarkupProvider(@"\Administrative\EditPage.xml");

            XDocument formDocument = XDocument.Load(markupProvider.GetReader());

            XElement bindingsXElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Bindings);
            XElement layoutXElement = formDocument.Root.Element(DataTypeDescriptorFormsHelper.CmsNamespace + FormKeyTagNames.Layout);
            XElement tabPanelsXElement = layoutXElement.Element(DataTypeDescriptorFormsHelper.MainNamespace + "TabPanels");


            IEnumerable<ICompositionContainer> compositionContainers = selectedPage.GetAllowedMetaDataContainers().Evaluate();

            Dictionary<Guid, XElement> compositionTabs = new Dictionary<Guid, XElement>();

            foreach (ICompositionContainer compositionContainer in compositionContainers)
            {
                XElement element = new XElement(Namespaces.BindingFormsStdUiControls10 + "PlaceHolder");
                element.Add(new XAttribute("Label", StringResourceSystemFacade.ParseString(compositionContainer.Label)));

                compositionTabs.Add(compositionContainer.Id, element);
            }

            Dictionary<string, List<ClientValidationRule>> clientValidationRules = new Dictionary<string, List<ClientValidationRule>>();

            List<IPageMetaDataDefinition> pageMetaDataDefinitions = selectedPage.GetAllowedMetaDataDefinitions();

            foreach (IPageMetaDataDefinition pageMetaDataDefinition in pageMetaDataDefinitions)
            {
                Guid metaDatTypeId = pageMetaDataDefinition.MetaDataTypeId;

                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(metaDatTypeId);
                Verify.IsNotNull(dataTypeDescriptor, "Failed to get meta data type by id '{0}'. If data type was purposely removed, in order to fix this exception you should remove IPageMetaDataDefinition records that reference this data type.", metaDatTypeId);

                Type metaDataType = TypeManager.TryGetType(dataTypeDescriptor.TypeManagerTypeName);
                Verify.IsNotNull(metaDataType, "Failed to get meta data type '{0}', id: {1}. If it has been removed, references from '{2}' have to be removed as well",
                                                dataTypeDescriptor.TypeManagerTypeName, metaDatTypeId, typeof(IPageMetaDataDefinition).Name);

                DataTypeDescriptorFormsHelper helper = CreateDataTypeDescriptorFormsHelper(pageMetaDataDefinition, dataTypeDescriptor);

                IData metaData = selectedPage.GetMetaData(pageMetaDataDefinition.Name, metaDataType);
                if (metaData == null)
                {
                    metaData = DataFacade.BuildNew(metaDataType);

                    PageMetaDataFacade.AssignMetaDataSpecificValues(metaData, pageMetaDataDefinition.Name, selectedPage);

                    ILocalizedControlled localizedData = metaData as ILocalizedControlled;
                    if (localizedData != null)
                    {
                        localizedData.SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;
                    }

                    IPublishControlled publishControlled = metaData as IPublishControlled;
                    publishControlled.PublicationStatus = GenericPublishProcessController.Draft;

                    helper.UpdateWithNewBindings(this.Bindings);
                    helper.ObjectToBindings(metaData, this.Bindings);
                }
                else
                {
                    helper.UpdateWithBindings(metaData, this.Bindings);
                }


                bindingsXElement.Add(helper.BindingXml.Elements());
                compositionTabs[pageMetaDataDefinition.MetaDataContainerId].Add(helper.PanelXml);

                clientValidationRules.AddDictionary(helper.GetBindingsValidationRules(metaData));
            }


            XElement previewTabPanel = tabPanelsXElement.Elements().Last();

            foreach (XElement element in compositionTabs.Values)
            {
                previewTabPanel.AddBeforeSelf(element);
            }



            IDictionary<string, string> transitionNames = new Dictionary<string, string>();
            transitionNames.Add(GenericPublishProcessController.Draft, StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.EditPage.DraftTransition"));
            transitionNames.Add(GenericPublishProcessController.AwaitingApproval, StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.EditPage.AwaitingApprovalTransition"));

            string username = UserValidationFacade.GetUsername();
            IEnumerable<UserPermissionDefinition> userPermissionDefinitions = PermissionTypeFacade.GetUserPermissionDefinitions(username);
            IEnumerable<UserGroupPermissionDefinition> userGroupPermissionDefinitions = PermissionTypeFacade.GetUserGroupPermissionDefinitions(username);
            IEnumerable<PermissionType> currentPermissionTypes = PermissionTypeFacade.GetCurrentPermissionTypes(UserValidationFacade.GetUserToken(), this.EntityToken, userPermissionDefinitions, userGroupPermissionDefinitions);
            foreach (PermissionType permissionType in currentPermissionTypes)
            {
                if (GenericPublishProcessController.AwaitingPublicationActionPermissionType.Contains(permissionType))
                {
                    transitionNames.Add(GenericPublishProcessController.AwaitingPublication, StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.EditPage.AwaitingPublicationTransition"));
                    break;
                }
            }


            List<IPagePlaceholderContent> contents = DataFacade.GetData<IPagePlaceholderContent>(f => f.PageId == selectedPage.Id).ToList();
            Dictionary<string, string> namedXhtmlFragments = new Dictionary<string, string>();
            foreach (IPagePlaceholderContent content in contents)
            {
                namedXhtmlFragments.Add(content.PlaceHolderId, content.Content ?? "");
            }



            this.UpdateBinding("SelectablePageTypeIds", GetSelectablePageTypes());
            this.UpdateBinding("SelectableTemplateIds", GetSelectablePageTemplates());
            this.UpdateBinding("NamedXhtmlFragments", namedXhtmlFragments);
            this.UpdateBinding("StateOptions", transitionNames);


            IPagePublishSchedule existingPagePublishSchedule =
                            (from ps in DataFacade.GetData<IPagePublishSchedule>()
                             where ps.PageId == selectedPage.Id
                             select ps).FirstOrDefault();

            if (existingPagePublishSchedule != null)
            {
                this.UpdateBinding("PublishDate", existingPagePublishSchedule.PublishDate);
            }
            else
            {
                this.UpdateBinding("PublishDate", null);
            }

            IPageUnpublishSchedule existingPageUnpublishSchedule =
                            (from ps in DataFacade.GetData<IPageUnpublishSchedule>()
                             where ps.PageId == selectedPage.Id
                             select ps).FirstOrDefault();

            if (existingPageUnpublishSchedule != null)
            {
                this.UpdateBinding("UnpublishDate", existingPageUnpublishSchedule.UnpublishDate);
            }
            else
            {
                this.UpdateBinding("UnpublishDate", null);
            }

            string formDefinition = formDocument.GetDocumentAsString();

            this.DeliverFormData(
                    selectedPage.Title,
                    StandardUiContainerTypes.Document,
                    formDefinition,
                    this.Bindings,
                    clientValidationRules
                );
        }



        private void newPageTypeSelectedCodeActivity_UpdateView_ExecuteCode(object sender, EventArgs e)
        {
            this.RerenderView();
        }



        private void saveCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            UpdateTreeRefresher updateTreeRefresher = this.CreateUpdateTreeRefresher(this.EntityToken);

            IPage selectedPage = this.GetBinding<IPage>("SelectedPage");
            IPage originalPage = DataFacade.GetData<IPage>(f => f.Id == selectedPage.Id).SingleOrDefault();

            bool viewLabelUpdated = originalPage == null 
                || selectedPage.MenuTitle != originalPage.MenuTitle
                || selectedPage.Title != originalPage.Title;

            bool treeviewRequiresRefreshing = false;

            Dictionary<string, IData> dataToAdd = new Dictionary<string, IData>();
            Dictionary<string, IData> dataToUpdate = new Dictionary<string, IData>();

            bool _dataValidated = true;

            WorkflowInstance publishWorkflowInstance = null;
            WorkflowInstance unpublishWorkflowInstance = null;

            try
            {
                using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
                {
                    _dataValidated = PrepareAddUpdateMetaData(selectedPage, dataToAdd, dataToUpdate);


                    if (_dataValidated)
                    {
                        HandlePublishUnpublishWorkflows(selectedPage, ref publishWorkflowInstance, ref unpublishWorkflowInstance);

                        if (selectedPage.PageTypeId != originalPage.PageTypeId)
                        {
                            // Adding metadata fields
                            IEnumerable<IPageMetaDataDefinition> oldPageMetaDataDefinitions = originalPage.GetAllowedMetaDataDefinitions().Except(selectedPage.GetAllowedMetaDataDefinitions(), new PageMetaDataDefinitionEqualityComparer());

                            foreach (IPageMetaDataDefinition pageMetaDataDefinition in oldPageMetaDataDefinitions)
                            {
                                IData oldMetaData = selectedPage.GetMetaData(pageMetaDataDefinition.Name, pageMetaDataDefinition.MetaDataTypeId);
                                if (oldMetaData != null)
                                {
                                    ProcessControllerFacade.FullDelete(oldMetaData);
                                }
                            }


                            // Adding page folders
                            IEnumerable<IPageTypeDataFolderTypeLink> pageTypeDataFolderTypeLinks =
                                DataFacade.GetData<IPageTypeDataFolderTypeLink>().
                                Where(f => f.PageTypeId == selectedPage.PageTypeId).
                                Evaluate().
                                RemoveDeadLinks();

                            foreach (IPageTypeDataFolderTypeLink pageTypeDataFolderTypeLink in pageTypeDataFolderTypeLinks)
                            {
                                if (selectedPage.GetFolderDefinitionId(pageTypeDataFolderTypeLink.DataTypeId) != Guid.Empty) continue;

                                selectedPage.AddFolderDefinition(pageTypeDataFolderTypeLink.DataTypeId);
                                treeviewRequiresRefreshing = true;
                            }



                            // Adding applications
                            IEnumerable<IPageTypeTreeLink> pageTypeTreeLinks =
                                DataFacade.GetData<IPageTypeTreeLink>().
                                Where(f => f.PageTypeId == selectedPage.PageTypeId).
                                Evaluate().
                                RemoveDeadLinks();

                            foreach (IPageTypeTreeLink pageTypeTreeLink in pageTypeTreeLinks)
                            {
                                Tree tree = TreeFacade.GetTree(pageTypeTreeLink.TreeId);
                                if (tree.HasAttachmentPoints(selectedPage.GetDataEntityToken())) continue;

                                TreeFacade.AddPersistedAttachmentPoint(pageTypeTreeLink.TreeId, typeof(IPage), selectedPage.Id);
                                treeviewRequiresRefreshing = true;
                            }
                        }


                        foreach (IData data in dataToAdd.Values)
                        {
                            DataFacade.AddNew(data);
                        }

                        foreach (IData data in dataToUpdate.Values)
                        {
                            IPublishControlled publishControlled = data as IPublishControlled;
                            publishControlled.PublicationStatus = GenericPublishProcessController.Draft;

                            DataFacade.Update(data);
                        }

                        treeviewRequiresRefreshing |= (originalPage.Title != selectedPage.Title) ||
                                                   (originalPage.Description != selectedPage.Description) ||
                                                   (originalPage.PublicationStatus != selectedPage.PublicationStatus);

                        // NOTE: updating originalPage object, in order to make XML & SQL provider work in the same way
                        originalPage.TemplateId = selectedPage.TemplateId;
                        originalPage.PageTypeId = selectedPage.PageTypeId;
                        originalPage.Title = selectedPage.Title;
                        originalPage.MenuTitle = selectedPage.MenuTitle;
                        originalPage.UrlTitle = selectedPage.UrlTitle;
                        originalPage.FriendlyUrl = selectedPage.FriendlyUrl;
                        originalPage.Description = selectedPage.Description;
                        originalPage.PublicationStatus = selectedPage.PublicationStatus;
                        originalPage.SourceCultureName = selectedPage.SourceCultureName;
                        DataFacade.Update(originalPage);

                        Dictionary<string, string> contentDictionary = this.GetBinding<Dictionary<string, string>>("NamedXhtmlFragments");
                        List<IPagePlaceholderContent> existingContents = DataFacade.GetData<IPagePlaceholderContent>(f => f.PageId == selectedPage.Id).ToList();

                        foreach (IPagePlaceholderContent existingContent in existingContents)
                        {
                            if (contentDictionary.ContainsKey(existingContent.PlaceHolderId))
                            {
                                existingContent.Content = contentDictionary[existingContent.PlaceHolderId];
                                existingContent.PublicationStatus = GenericPublishProcessController.Draft;
                                DataFacade.Update(existingContent);
                            }
                            else
                            {
                                DataFacade.Delete<IPagePlaceholderContent>(existingContent);
                            }
                        }

                        foreach (var contentDictionaryElement in contentDictionary.Where(f => existingContents.Any(existing => existing.PlaceHolderId == f.Key) == false))
                        {
                            IPagePlaceholderContent newContent = DataFacade.BuildNew<IPagePlaceholderContent>();
                            newContent.PageId = selectedPage.Id;
                            newContent.PlaceHolderId = contentDictionaryElement.Key;
                            newContent.Content = contentDictionaryElement.Value;
                            newContent.SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;
                            newContent.PublicationStatus = GenericPublishProcessController.Draft;

                            DataFacade.AddNew<IPagePlaceholderContent>(newContent);
                        }
                    }

                    transactionScope.Complete();
                }

                if (publishWorkflowInstance != null)
                {
                    publishWorkflowInstance.Start();
                    WorkflowFacade.RunWorkflow(publishWorkflowInstance);
                }

                if (unpublishWorkflowInstance != null)
                {
                    unpublishWorkflowInstance.Start();
                    WorkflowFacade.RunWorkflow(unpublishWorkflowInstance);
                }                

                if (_doPublish)
                {
                    if (publishWorkflowInstance==null || this.PublishDate < DateTime.Now)
                    {
                        GenericPublishProcessController.PublishActionToken actionToken = new GenericPublishProcessController.PublishActionToken();

                        FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);

                        ActionExecutorFacade.Execute(EntityToken, actionToken, serviceContainer);

                        treeviewRequiresRefreshing = false;
                    }
                    else
                    {
                        string title = StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.EditPage.PublishDatePreventPublishTitle");
                        string message = StringResourceSystemFacade.GetString("Composite.Management", "Website.Forms.Administrative.EditPage.PublishDatePreventPublish");
                        this.ShowMessage(DialogType.Warning, title, message);
                    }
                }
                
                if (treeviewRequiresRefreshing)
                {
                    updateTreeRefresher.PostRefreshMesseges(selectedPage.GetDataEntityToken());
                }

                this.UpdateBinding("OldPublicationStatus", selectedPage.PublicationStatus);

                if (viewLabelUpdated)
                {
                    RerenderView();
                }
            }
            catch (Exception ex)
            {
                Exception mostSpecificException = ex;
                while (mostSpecificException.InnerException != null) mostSpecificException = mostSpecificException.InnerException;
                this.ShowMessage(DialogType.Error, "Save failed", string.Format("Save failed: {0}", mostSpecificException.Message));
                Log.LogError("Page save", ex);
            }
            finally
            {
                SetSaveStatus(_dataValidated);
            }
        }



        private bool PrepareAddUpdateMetaData(IPage selectedPage, Dictionary<string, IData> dataToAdd, Dictionary<string, IData> dataToUpdate)
        {
            bool isValid = ValidateBindings();

            IEnumerable<IPageMetaDataDefinition> pageMetaDataDefinitions = selectedPage.GetAllowedMetaDataDefinitions().Evaluate();

            foreach (IPageMetaDataDefinition pageMetaDataDefinition in pageMetaDataDefinitions)
            {
                DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(pageMetaDataDefinition.MetaDataTypeId);
                Type metaDataType = TypeManager.GetType(dataTypeDescriptor.TypeManagerTypeName);

                DataTypeDescriptorFormsHelper helper = CreateDataTypeDescriptorFormsHelper(pageMetaDataDefinition, dataTypeDescriptor);

                IData metaData = selectedPage.GetMetaData(pageMetaDataDefinition.Name, metaDataType);
                if (metaData == null)
                {
                    IData newData = DataFacade.BuildNew(metaDataType);

                    PageMetaDataFacade.AssignMetaDataSpecificValues(newData, pageMetaDataDefinition.Name, selectedPage);

                    ILocalizedControlled localizedData = newData as ILocalizedControlled;
                    if (localizedData != null)
                    {
                        localizedData.SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;
                    }

                    if (!BindAndValidate(helper, newData))
                    {
                        isValid = false;
                    }

                    dataToAdd.Add(helper.BindingNamesPrefix, newData);
                }
                else
                {
                    if (!BindAndValidate(helper, metaData))
                    {
                        isValid = false;
                    }

                    dataToUpdate.Add(helper.BindingNamesPrefix, metaData);
                }
            }


            ValidationResults pageValidationResults = ValidationFacade.Validate<IPage>(selectedPage);

            if (pageValidationResults.IsValid == false)
            {
                isValid = false;
            }


            foreach (KeyValuePair<string, IData> kvp in dataToAdd.Concat(dataToUpdate))
            {
                ValidationResults validationResults = ValidationFacade.Validate(kvp.Value);

                if (validationResults.IsValid == false)
                {
                    isValid = false;

                    foreach (ValidationResult result in validationResults)
                    {
                        this.ShowFieldMessage(DataTypeDescriptorFormsHelper.GetBindingName(kvp.Key, result.Key), result.Message);
                    }
                }
            }

            return isValid;
        }


        private DateTime? PublishDate 
        {
            get { return this.GetBinding<DateTime?>("PublishDate"); }
        }

        private DateTime? UnpublishDate
        {
            get { return this.GetBinding<DateTime?>("UnpublishDate"); }
        }



        private void HandlePublishUnpublishWorkflows(IPage selectedPage, ref WorkflowInstance publishWorkflowInstance, ref WorkflowInstance unpublishWorkflowInstance)
        {
            DateTime? publishDateTime = this.PublishDate;
            DateTime? unpublishDateTime = this.UnpublishDate;

            IPagePublishSchedule existingPagePublishSchedule =
                (from ps in DataFacade.GetData<IPagePublishSchedule>()
                 where ps.PageId == selectedPage.Id
                 select ps).FirstOrDefault();

            if (existingPagePublishSchedule != null)
            {
                WorkflowFacade.AbortWorkflow(existingPagePublishSchedule.WorkflowInstanceId);

                DataFacade.Delete<IPagePublishSchedule>(existingPagePublishSchedule);
            }

            if (publishDateTime != null)
            {
                publishWorkflowInstance = WorkflowFacade.CreateNewWorkflow(
                        typeof(PagePublishSchedulerWorkflow),
                        new Dictionary<string, object> { 
                                        { "PublishDate", publishDateTime },
                                        { "PageId", selectedPage.Id },
                                        { "LocaleName", UserSettings.ActiveLocaleCultureInfo.Name }
                                    }
                    );

                IPagePublishSchedule newPagePublishSchedule = DataFacade.BuildNew<IPagePublishSchedule>();
                newPagePublishSchedule.Id = Guid.NewGuid();
                newPagePublishSchedule.PageId = selectedPage.Id;
                newPagePublishSchedule.PublishDate = publishDateTime.Value;
                newPagePublishSchedule.WorkflowInstanceId = publishWorkflowInstance.InstanceId;
                newPagePublishSchedule.LocaleCultureName = UserSettings.ActiveLocaleCultureInfo.Name;

                DataFacade.AddNew<IPagePublishSchedule>(newPagePublishSchedule);
            }



            IPageUnpublishSchedule existingPageUnpublishSchedule =
                (from ps in DataFacade.GetData<IPageUnpublishSchedule>()
                 where ps.PageId == selectedPage.Id
                 select ps).FirstOrDefault();

            if (existingPageUnpublishSchedule != null)
            {
                WorkflowFacade.AbortWorkflow(existingPageUnpublishSchedule.WorkflowInstanceId);

                DataFacade.Delete<IPageUnpublishSchedule>(existingPageUnpublishSchedule);
            }

            if (unpublishDateTime != null)
            {
                unpublishWorkflowInstance = WorkflowFacade.CreateNewWorkflow(
                        typeof(PageUnpublishSchedulerWorkflow),
                        new Dictionary<string, object> { 
                                        { "UnpublishDate", unpublishDateTime },
                                        { "PageId", selectedPage.Id },
                                        { "LocaleName", UserSettings.ActiveLocaleCultureInfo.Name }
                                    }
                    );

                IPageUnpublishSchedule newPageUnpublishSchedule = DataFacade.BuildNew<IPageUnpublishSchedule>();
                newPageUnpublishSchedule.Id = Guid.NewGuid();
                newPageUnpublishSchedule.PageId = selectedPage.Id;
                newPageUnpublishSchedule.UnpublishDate = unpublishDateTime.Value;
                newPageUnpublishSchedule.WorkflowInstanceId = unpublishWorkflowInstance.InstanceId;
                newPageUnpublishSchedule.LocaleCultureName = UserSettings.ActiveLocaleCultureInfo.Name;

                DataFacade.AddNew<IPageUnpublishSchedule>(newPageUnpublishSchedule);
            }
        }



        private void editPreviewCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            FlowControllerServicesContainer serviceContainer = WorkflowFacade.GetFlowControllerServicesContainer(WorkflowEnvironment.WorkflowInstanceId);
            IFormFlowWebRenderingService webRenderService = serviceContainer.GetService<IFormFlowWebRenderingService>();

            try
            {
                IPage selectedPage = this.GetBinding<IPage>("SelectedPage");

                List<IPagePlaceholderContent> contents = new List<IPagePlaceholderContent>();
                Dictionary<string, string> namedXhtmlFragments = this.GetBinding<Dictionary<string, string>>("NamedXhtmlFragments");
                foreach (var placeHolderContent in namedXhtmlFragments)
                {
                    IPagePlaceholderContent content = DataFacade.BuildNew<IPagePlaceholderContent>();
                    content.PageId = selectedPage.Id;
                    content.PlaceHolderId = placeHolderContent.Key;
                    content.Content = placeHolderContent.Value;
                    contents.Add(content);
                }

                string output = PagePreviewBuilder.RenderPreview(selectedPage, contents);
                webRenderService.SetNewPageOutput(new LiteralControl(output));
            }
            catch (Exception ex)
            {
                Control errOutput = new LiteralControl("<pre>" + ex + "</pre>");
                webRenderService.SetNewPageOutput(errOutput);
            }
        }



        private static void TrimFieldValues(IPage page)
        {
            page.Title = page.Title.Trim();
            page.MenuTitle = page.MenuTitle.Trim();
            page.UrlTitle = page.UrlTitle.Trim();

            string friendlyURL = page.FriendlyUrl;
            page.FriendlyUrl = friendlyURL != null ? friendlyURL.Trim() : null;
        }


        private bool FieldHasValidLength(string fieldValue, string fieldName, int maximumLength)
        {
            if (fieldValue.Length <= maximumLength)
            {
                return true;
            }

            string bindingName = "SelectedPage." + fieldName;

            this.ShowFieldMessage(bindingName, GetText("EditPage.MaxLength").FormatWith(maximumLength));
            return false;
        }

        private void ValidateSave(object sender, ConditionalEventArgs e)
        {
            IPage selectedPage = this.GetBinding<IPage>("SelectedPage");

            selectedPage.MenuTitle = selectedPage.MenuTitle ?? string.Empty;
            selectedPage.FriendlyUrl = selectedPage.FriendlyUrl ?? string.Empty;

            TrimFieldValues(selectedPage);

            if (!FieldHasValidLength(selectedPage.Title, "Title", 255)
                || !FieldHasValidLength(selectedPage.MenuTitle, "MenuTitle", 64)
                || !FieldHasValidLength(selectedPage.UrlTitle, "UrlTitle", 64)
                || !FieldHasValidLength(selectedPage.FriendlyUrl, "FriendlyUrl", 64))
            {
                e.Result = false;
                return;
            }

            e.Result = true;

            string processedUrlTitle = UrlFormattersPluginFacade.FormatUrl(selectedPage.UrlTitle, true);
            if (selectedPage.UrlTitle != processedUrlTitle)
            {
                this.RerenderView();
                selectedPage.UrlTitle = processedUrlTitle;
                this.ShowMessage(DialogType.Message,
                    GetText("EditPage.UrlTitleFormattedTitle"),
                    (GetText("EditPage.UrlTitleFormattedMessage") ?? string.Empty).FormatWith(processedUrlTitle));
            }

            List<string> siblingPageUrlTitles =
                (from page in PageServices.GetChildren(selectedPage.GetParentId())
                 where page.Id != selectedPage.Id
                 select page.UrlTitle).ToList();

            foreach (string siblingUrlTitle in siblingPageUrlTitles)
            {
                if (siblingUrlTitle.Equals(selectedPage.UrlTitle, StringComparison.InvariantCultureIgnoreCase))
                {
                    this.ShowFieldMessage("SelectedPage.UrlTitle", "${Composite.Plugins.PageElementProvider, UrlTitleNotUniqueError}");
                    e.Result = false;
                    break;
                }
            }

            if (string.IsNullOrEmpty(selectedPage.FriendlyUrl) == false)
            {
                List<string> usedFrendlyUrls = DataFacade.GetData<IPage>(f => f.FriendlyUrl != null && f.FriendlyUrl != string.Empty && f.Id != selectedPage.Id).Select(f => f.FriendlyUrl).ToList();

                if (usedFrendlyUrls.Any(f => f.Equals(selectedPage.FriendlyUrl, StringComparison.InvariantCultureIgnoreCase)))
                {
                    this.ShowFieldMessage("SelectedPage.FriendlyUrl", "${Composite.Plugins.PageElementProvider, FriendlyUrlNotUniqueError}");
                    e.Result = false;
                }
            }

            if (string.IsNullOrEmpty(selectedPage.Title))
            {
                this.ShowFieldMessage("SelectedPage.Title", "${Composite.Plugins.PageElementProvider, TitleMissingError}");
                e.Result = false;
            }

            ValidationResults validationResults = ValidationFacade.Validate<IPage>(selectedPage);
            if (validationResults.IsValid == false)
            {
                if (validationResults.Any(f => f.Key == "UrlTitle"))
                {
                    this.ShowFieldMessage("SelectedPage.UrlTitle", "${Composite.Plugins.PageElementProvider, UrlTitleNotValidError}");
                    e.Result = false;
                }

                foreach (ValidationResult validationResult in validationResults.Where(f => f.Key != "UrlTitle"))
                {
                    this.ShowFieldMessage("SelectedPage." + validationResult.Key, validationResult.Message);
                }
            }

            if (!ValidateBindings())
            {
                e.Result = false;
            }
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", key);
        }


        private void PageStillExists(object sender, ConditionalEventArgs e)
        {
            IPage selectedPage = this.GetBinding<IPage>("SelectedPage");
            IPage originalPage = DataFacade.GetData<IPage>(f => f.Id == selectedPage.Id).SingleOrDefault();

            e.Result = originalPage != null;
        }


        private void setToPublishCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            _doPublish = true;
        }
    }
}