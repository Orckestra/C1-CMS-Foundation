using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Workflow.Activities;

using Composite.C1Console.Actions;
using Composite.C1Console.Events;
using Composite.Core.Routing.Foundation.PluginFacades;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.Data.ProcessControlled.ProcessControllers.GenericPublishProcessController;
using Composite.Data.Types;
using Composite.Data.Validation;
using Composite.Data.Validation.ClientValidationRules;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.Extensions;
using Composite.C1Console.Users;
using Composite.C1Console.Trees;
using Composite.C1Console.Workflow;

using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Plugins.Elements.ElementProviders.PageElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewPageWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        [NonSerialized]
        private List<IPageType> _selectablePageTypes = null;


        public AddNewPageWorkflow()
        {
            InitializeComponent();
        }



        private Guid GetParentId()
        {
            if (this.EntityToken is PageElementProviderEntityToken)
            {
                return Guid.Empty;
            }

            if (this.EntityToken is DataEntityToken)
            {
                DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
                IPage selectedPage = (IPage)dataEntityToken.Data;

                return selectedPage.Id;
            }

            throw new NotImplementedException();
        }




        private List<IPageType> GetSelectablePageTypes()
        {
            if (_selectablePageTypes == null)
            {
                if (this.EntityToken is PageElementProviderEntityToken)
                {
                    _selectablePageTypes =
                        DataFacade.GetData<IPageType>().
                        Where(f => (f.Available == true) && (f.HomepageRelation != PageTypeHomepageRelation.OnlySubPages.ToString())).
                        OrderBy(f => f.Name).
                        ToList();
                }
                else
                {
                    IPage page = this.GetDataItemFromEntityToken<IPage>();

                    _selectablePageTypes = page.GetChildPageSelectablePageTypes().ToList();
                }
            }

            return _selectablePageTypes;
        }



        private Guid? GetDefaultPageTypeId(IEnumerable<IPageType> selectablePageTypes)
        {
            if (!(this.EntityToken is PageElementProviderEntityToken))
            {
                IPage parentPage = this.GetDataItemFromEntityToken<IPage>();

                IPageType parentPageType = DataFacade.GetData<IPageType>().Where(f => f.Id == parentPage.PageTypeId).FirstOrDefault();

                if (parentPageType != null && parentPageType.DefaultChildPageType != Guid.Empty)
                {
                    if (selectablePageTypes.Where(f => f.Id == parentPageType.DefaultChildPageType).Any())
                    {
                        return parentPageType.DefaultChildPageType;
                    }
                }
            }

            var pageType = selectablePageTypes.FirstOrDefault();

            return pageType != null ? pageType.Id : new Guid?();
        }



        private void MissingTemplateAlertActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                GetText("PageElementProvider.MissingTemplateTitle"),
                GetText("PageElementProvider.MissingTemplateMessage"));
        }



        private void MissingActiveLanguageCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                GetText("PageElementProvider.MissingActiveLanguageTitle"),
                GetText("PageElementProvider.MissingActiveLanguageMessage"));
        }



        private void MissingPageTypeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            if (this.EntityToken is PageElementProviderEntityToken)
            {
                ShowMessage(
                    DialogType.Message,
                    GetText("PageElementProvider.MissingPageTypeTitle"),
                    GetText("PageElementProvider.MissingPageTypeHomepageMessage"));
            }
            else
            {
                ShowMessage(
                    DialogType.Message,
                    GetText("PageElementProvider.MissingPageTypeTitle"),
                    GetText("PageElementProvider.MissingPageTypeSubpageMessage"));
            }
        }



        private void RuleDontAllowPageAddCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowMessage(
                DialogType.Message,
                GetText("PageElementProvider.RuleDontAllowPageAddTitle"),
                GetText("PageElementProvider.RuleDontAllowPageAddMessage"));
        }

        private static string GetText(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageElementProvider", key);
        }

        private void CheckTemplatesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = (DataFacade.GetData<IPageTemplate>().Count() != 0);
        }



        private void CheckActiveLanguagesExists(object sender, ConditionalEventArgs e)
        {
            e.Result = UserSettings.ActiveLocaleCultureInfo != null;
        }



        private void CheckPageTypeExists(object sender, ConditionalEventArgs e)
        {

            if (this.EntityToken is PageElementProviderEntityToken)
            {
                e.Result =
                    DataFacade.GetData<IPageType>().
                    Where(f => f.Available == true && f.HomepageRelation != PageTypeHomepageRelation.OnlySubPages.ToString()).
                    Any();
            }
            else
            {
                e.Result =
                    DataFacade.GetData<IPageType>().
                    Where(f => f.Available == true && f.HomepageRelation != PageTypeHomepageRelation.OnlyHomePages.ToString()).
                    Any();
            }
        }



        private void CheckRulesAllowPageAddExists(object sender, ConditionalEventArgs e)
        {
            e.Result = GetSelectablePageTypes().Count > 0;
        }


        private void CheckPageTypesExist(object sender, ConditionalEventArgs e)
        {
            e.Result = GetSelectablePageTypes().Any();

            if (!e.Result)
            {
                ShowMessage(DialogType.Error,
                    GetText("PageElementProvider.NoPageTypesAvailableTitle"),
                    GetText("PageElementProvider.NoPageTypesAvailableMessage"));
            }
        }

        private bool ThereAreOtherPages()
        {
            foreach(var cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
            {
                using(new DataScope(PublicationScope.Unpublished, cultureInfo))
                {
                    if(DataFacade.GetData<IPageStructure>().Any())
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        private void stepInitialize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            Guid templateId;
            string cultureName;

            if (this.EntityToken is PageElementProviderEntityToken)
            {
                cultureName = null;
                templateId = DataFacade.GetData<IPageTemplate>().Select(f => f.Id).FirstOrDefault();
            }
            else if (this.EntityToken is DataEntityToken)
            {
                DataEntityToken dataEntityToken = (DataEntityToken)this.EntityToken;
                IPage selectedPage = (IPage)dataEntityToken.Data;

                templateId = selectedPage.TemplateId;
                cultureName = selectedPage.CultureName;
            }
            else
            {
                throw new NotImplementedException();
            }


            List<IPageType> selectablePageTypes = GetSelectablePageTypes();

            Guid? pageTypeId = GetDefaultPageTypeId(selectablePageTypes);

            Verify.That(pageTypeId.HasValue, "Failed to get a page type");

            Guid parentId = GetParentId();

            Dictionary<string, object> bindings = new Dictionary<string, object>();



            List<KeyValuePair<Guid, string>> pageTypeOptions =
                selectablePageTypes.
                Select(f => new KeyValuePair<Guid, string>(f.Id, f.Name)).
                ToList();

            bindings.Add("PageTypeOptions", pageTypeOptions);


            IPage newPage = DataFacade.BuildNew<IPage>();
            newPage.Id = Guid.NewGuid();
            newPage.TemplateId = templateId;
            newPage.PageTypeId = pageTypeId.Value;
            newPage.CultureName = cultureName;
            newPage.Title = "";
            newPage.MenuTitle = "";
            newPage.UrlTitle = "";
            newPage.FriendlyUrl = "";
            newPage.PublicationStatus = GenericPublishProcessController.Draft;

            bindings.Add("NewPage", newPage);

            bindings.Add("UrlTitleIsRequired", true /* ThereAreOtherPages()*/);

            int existingPagesCount = PageServices.GetChildrenCount(parentId);
            Dictionary<string, string> sortOrder = new Dictionary<string, string>();
            sortOrder.Add("Bottom", GetText("AddNewPageStep1.LabelAddToBottom"));
            if (existingPagesCount > 0)
            {
                sortOrder.Add("Top", GetText("AddNewPageStep1.LabelAddToTop"));
                if (existingPagesCount > 1)
                {
                    sortOrder.Add("Relative", GetText("AddNewPageStep1.LabelAddBelowOtherPage"));
                }

                bool isAlpabeticOrdered = PageServices.IsChildrenAlphabeticOrdered(parentId);
                if (isAlpabeticOrdered == true)
                {
                    sortOrder.Add("Alphabetic", GetText("AddNewPageStep1.LabelAddAlphabetic"));
                }
            }
            bindings.Add("SortOrder", sortOrder);
            bindings.Add("SelectedSortOrder", sortOrder.Keys.First());

            if (parentId == Guid.Empty)
            {
                bindings.Add("ShowCulture", true);
                bindings.Add("Cultures", DataLocalizationFacade.WhiteListedLocales
                                         .Select(f => new KeyValuePair<string, string>(f.Name, DataLocalizationFacade.GetCultureTitle(f))).ToList());
            }
            else
            {
                bindings.Add("ShowCulture", false);
            }

            this.Bindings = bindings;
        }


        private void CanSkipStep2(object sender, ConditionalEventArgs e)
        {
            if (this.GetBinding<string>("SelectedSortOrder") == "Relative")
            {
                e.Result = false;
            }
            else
            {
                if (UrlTitleIsUniqueAmongSiblings() == false)
                {
                    e.Result = false;
                }
                else
                {
                    e.Result = true;
                }
            }

        }


        private void ValidateUrlTitle(object sender, ConditionalEventArgs e)
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");

            if (this.CurrentStateName == "step1State")
            {
                SetDefaultValues(newPage);
            }

            if (UrlTitleIsUniqueAmongSiblings() == false)
            {
                string fieldName = "NewPage.UrlTitle";
                if (this.CurrentStateName == "step1State")
                {
                    fieldName = "NewPage.Title";
                }

                this.ShowFieldMessage(fieldName, "${Composite.Plugins.PageElementProvider, UrlTitleNotUniqueError}");
                e.Result = false;
            }
            else
            {
                ValidationResults validationResults = ValidationFacade.Validate<IPage>(newPage);

                if (validationResults.IsValid == false && validationResults.Any(f => f.Key == "UrlTitle"))
                {
                    this.ShowFieldMessage("NewPage.Title", "${Composite.Plugins.PageElementProvider, UrlTitleNotValidError}");
                    e.Result = false;
                }
                else
                {
                    e.Result = true;
                }
            }

            DataTypeDescriptor dataTypeDescriptor = DynamicTypeManager.GetDataTypeDescriptor(typeof(IPage));
            if ((newPage.UrlTitle.Length > dataTypeDescriptor.Fields["UrlTitle"].StoreType.MaximumLength) ||
                (newPage.MenuTitle.Length > dataTypeDescriptor.Fields["MenuTitle"].StoreType.MaximumLength))
            {
                newPage.UrlTitle = "";
                newPage.MenuTitle = "";

                this.ShowFieldMessage("NewPage.Title", "${Composite.Plugins.PageElementProvider, UrlTitleTooLong}");
                e.Result = false;
            }
        }



        private bool UrlTitleIsUniqueAmongSiblings()
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");

            var siblingPageUrlTitles =
                (from page in PageServices.GetChildren(GetParentId())
                 select page.UrlTitle).ToList();

            if (string.IsNullOrEmpty(newPage.UrlTitle) && ThereAreOtherPages())
            {
                newPage.UrlTitle = GenerateUrlTitleFromTitle(newPage.Title);

                if (string.IsNullOrEmpty(newPage.UrlTitle))
                {
                    return false;
                }
            }

            foreach (string siblingUrlTitle in siblingPageUrlTitles)
            {
                if (siblingUrlTitle.ToLower() == newPage.UrlTitle.ToLower())
                {
                    return false;
                }
            }

            return true;
        }



        private void PrepareStep2_ExecuteCode(object sender, EventArgs e)
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");

            SetDefaultValues(newPage);

            if (this.GetBinding<string>("SelectedSortOrder") == "Relative")
            {
                var existingPages =
                    (from page in PageServices.GetChildren(GetParentId())
                     select new { Title = page.Title, Id = page.Id }).ToList();

                if (this.BindingExist("ExistingPages") == false)
                {
                    this.Bindings.Add("ExistingPages", existingPages);
                }
                else
                {
                    this.Bindings["ExistingPages"] = existingPages;
                }

                if (this.BindingExist("RelativeSelectedPageId") == false)
                {
                    this.Bindings.Add("RelativeSelectedPageId", existingPages[0].Id);
                }
                else
                {
                    this.Bindings["RelativeSelectedPageId"] = existingPages[0].Id;
                }
            }
            else
            {
                if (this.Bindings.Keys.Contains("ExistingPages")) this.Bindings.Remove("ExistingPages");
                if (this.Bindings.Keys.Contains("RelativeSelectedPageId")) this.Bindings.Remove("RelativeSelectedPageId");
            }
        }



        private void stepFinalize_codeActivity_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            Guid parentId = GetParentId();

            IPage newPage = this.GetBinding<IPage>("NewPage");
            newPage.CultureName = UserSettings.ActiveLocaleCultureInfo.Name;
            newPage.SourceCultureName = UserSettings.ActiveLocaleCultureInfo.Name;

            IPageType selectedPageType = DataFacade.GetData<IPageType>().Where(f => f.Id == newPage.PageTypeId).Single();
            if (selectedPageType.DefaultTemplateId != Guid.Empty)
            {
                newPage.TemplateId = selectedPageType.DefaultTemplateId;
            }

            bool addToTop = this.GetBinding<string>("SelectedSortOrder") == "Top";
            bool addToBottom = this.GetBinding<string>("SelectedSortOrder") == "Bottom";
            bool addToAlphabetic = this.GetBinding<string>("SelectedSortOrder") == "Alphabetic";
            bool addToRelative = this.GetBinding<string>("SelectedSortOrder") == "Relative";

            using (DataScope dataScope = new DataScope(DataScopeIdentifier.Administrated))
            {
                if (addToTop == true)
                {
                    newPage = newPage.AddPageAtTop(parentId);
                }
                else if (addToBottom == true)
                {
                    newPage = newPage.AddPageAtBottom(parentId);
                }
                else if (addToAlphabetic == true)
                {
                    newPage = newPage.AddPageAlphabetic(parentId);
                }
                else if (addToRelative == true)
                {
                    Guid relativeSelectedPageId = this.GetBinding<Guid>("RelativeSelectedPageId");

                    newPage = newPage.AddPageAfter(parentId, relativeSelectedPageId);
                }
            }

            // Adding default page content
            IEnumerable<IPageTypeDefaultPageContent> pageTypeDefaultPageContents =
                DataFacade.GetData<IPageTypeDefaultPageContent>().
                Where(f => f.PageTypeId == selectedPageType.Id).
                Evaluate();

            foreach (IPageTypeDefaultPageContent pageTypeDefaultPageContent in pageTypeDefaultPageContents)
            {
                IPagePlaceholderContent pagePlaceholderContent = DataFacade.BuildNew<IPagePlaceholderContent>();
                pagePlaceholderContent.PageId = newPage.Id;
                pagePlaceholderContent.PlaceHolderId = pageTypeDefaultPageContent.PlaceHolderId;
                pagePlaceholderContent.Content = pageTypeDefaultPageContent.Content;
                DataFacade.AddNew<IPagePlaceholderContent>(pagePlaceholderContent);
            }


            // Adding page folders
            IEnumerable<IPageTypeDataFolderTypeLink> pageTypeDataFolderTypeLinks =
                DataFacade.GetData<IPageTypeDataFolderTypeLink>().
                Where(f => f.PageTypeId == selectedPageType.Id).
                Evaluate().
                RemoveDeadLinks();

            foreach (IPageTypeDataFolderTypeLink pageTypeDataFolderTypeLink in pageTypeDataFolderTypeLinks)
            {
                newPage.AddFolderDefinition(pageTypeDataFolderTypeLink.DataTypeId);
            }


            // Adding applications
            IEnumerable<IPageTypeTreeLink> pageTypeTreeLinks =
                DataFacade.GetData<IPageTypeTreeLink>().
                Where(f => f.PageTypeId == selectedPageType.Id).
                Evaluate().
                RemoveDeadLinks();


            foreach (IPageTypeTreeLink pageTypeTreeLink in pageTypeTreeLinks)
            {
                Tree tree = TreeFacade.GetTree(pageTypeTreeLink.TreeId);
                if (tree.HasAttachmentPoints(newPage.GetDataEntityToken()) == true) continue;

                TreeFacade.AddPersistedAttachmentPoint(pageTypeTreeLink.TreeId, typeof(IPage), newPage.Id);
            }

            SetSaveStatus(true);

            addNewTreeRefresher.PostRefreshMesseges(newPage.GetDataEntityToken());

            this.ExecuteWorklow(newPage.GetDataEntityToken(), typeof(EditPageWorkflow));
        }



        private string GenerateUrlTitleFromTitle(string title)
        {
            title = UrlFormattersPluginFacade.FormatUrl(title.Trim(), false);

            RegexClientValidationRule regexClientValidationRule = ClientValidationRuleFacade.GetClientValidationRules(this.GetBinding<IPage>("NewPage"), "UrlTitle").OfType<RegexClientValidationRule>().Single();

            StringBuilder generated = new StringBuilder();

            Regex regex = new Regex(regexClientValidationRule.Expression);

            foreach (char c in title)
            {
                string matchString = new string(c, 1);
                if (regex.IsMatch(matchString) == true)
                {
                    generated.Append(c);
                }
            }

            return generated.ToString();
        }



        private void PresetCalculatedFields_ExecuteCode(object sender, EventArgs e)
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");

            SetDefaultValues(newPage);
        }

        /// <summary>
        /// Sets default values for "MenuTitle" and "UrlTitle" fields if they were not set.
        /// </summary>
        /// <param name="page">The page.</param>
        private void SetDefaultValues(IPage page)
        {
            IPage newPage = this.GetBinding<IPage>("NewPage");
            IPageType selectedPageType = DataFacade.GetData<IPageType>().Where(f => f.Id == newPage.PageTypeId).Single();

            if ((selectedPageType.PresetMenuTitle == true) && (page.MenuTitle.IsNullOrEmpty() == true))
            {
                page.MenuTitle = page.Title;
            }

            if (page.UrlTitle.IsNullOrEmpty())
            {
                page.UrlTitle = GenerateUrlTitleFromTitle(page.Title);

                int i = 2;
                while (UrlTitleIsUniqueAmongSiblings() == false)
                {
                    page.UrlTitle = string.Format("{0}{1}", GenerateUrlTitleFromTitle(page.Title), i);
                    i++;
                }

            }
        }
    }
}
