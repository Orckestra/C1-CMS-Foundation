using System;
using System.Collections.Generic;
using System.Web.UI;
using System.Web.UI.WebControls;
using Composite;
using Composite.C1Console.RichContent.ContainerClasses;
using Composite.Core.Extensions;
using Composite.Core.PageTemplates;
using Composite.Plugins.Forms.WebChannel.CustomUiControls;

namespace CompositePageContentEditor
{
    public partial class PageContentEditor : PageContentEditorTemplateUserControlBase
    {
        private Guid SelectedTemplateId { get { return new Guid(this.TemplateSelector.SelectedValue); } }


        protected void Page_Load(object sender, EventArgs e)
        {
            if (this.ContentsPlaceHolder.Controls.Count == 0)
            {
                SetUpTextAreas(false);
            }
        }




        protected void TemplateSelector_SelectedIndexChanged(object sender, EventArgs e)
        {
            SetUpTextAreas(true);
        }


        protected override void BindStateToProperties()
        {
            this.TemplateId = this.SelectedTemplateId;

            var newNamedXhtmlFragments = new Dictionary<string, string>();
            foreach (Control c in this.ContentsPlaceHolder.Controls)
            {
                if (IsRealContent(((TextBox)c).Text))
                {
                    newNamedXhtmlFragments.Add(c.ID, ((TextBox)c).Text.Replace("&nbsp;", "&#160;"));
                }
            }

            this.NamedXhtmlFragments = newNamedXhtmlFragments;
        }


        protected override void InitializeViewState()
        {
            this.TemplateSelector.DataSource = this.SelectableTemplateIds;
            this.TemplateSelector.DataValueField = "Key";
            this.TemplateSelector.DataTextField = "Value";
            this.TemplateSelector.DataBind();

            Verify.That(SelectableTemplateIds.Count > 0, "No page templates available for selection");

            this.TemplateSelector.SelectedValue = this.TemplateId.ToString();

            SetUpTextAreas(true);
        }

        public override string GetDataFieldClientName()
        {
            return null;
        }


        private void SetUpTextAreas(bool flush)
        {
            Guid selectedTemplateId = this.SelectedTemplateId;

            PageTemplateDescriptor pageTemplate = PageTemplateFacade.GetPageTemplate(selectedTemplateId);

            Verify.IsNotNull(pageTemplate, "Failed to get page template by id '{0}'", selectedTemplateId);
            if (!pageTemplate.IsValid)
            {
                throw new InvalidOperationException(
                    "Page template '{0}' contains errors. You can edit the template in the 'Layout' section".FormatWith(selectedTemplateId),
                    pageTemplate.LoadingException);
            }

            var handledIds = new List<string>();

            ContentsPlaceHolder.Controls.Clear();
            foreach (var placeholderDescription in pageTemplate.PlaceholderDescriptions)
            {
                string placeholderId = placeholderDescription.Id;

                if (handledIds.Contains(placeholderId) == false)
                {
                    var pageTypeContainerClasses = ContainerClassManager.GetPageTypeContainerClasses(this.PageTypeId, placeholderDescription.Id);
                    var allContainerClasses = ContainerClassManager.MergeContainerClasses(placeholderDescription.ContainerClasses, pageTypeContainerClasses);

                    TextBox contentTextBox = new Composite.Core.WebClient.UiControlLib.TextBox();
                    contentTextBox.TextMode = TextBoxMode.MultiLine;
                    contentTextBox.ID = placeholderId;
                    contentTextBox.Attributes.Add("placeholderid", placeholderId);
                    contentTextBox.Attributes.Add("placeholdername", placeholderDescription.Title);
                    contentTextBox.Attributes.Add("containerclasses", string.Join(",", allContainerClasses));

                    if (placeholderId == pageTemplate.DefaultPlaceholderId)
                    {
                        contentTextBox.Attributes.Add("selected", "true");
                    }
                    if (flush)
                    {
                        if (this.NamedXhtmlFragments.ContainsKey(placeholderId))
                        {
                            contentTextBox.Text = this.NamedXhtmlFragments[placeholderId];
                        }
                        else
                        {
                            contentTextBox.Text = "";
                        }
                    }
                    ContentsPlaceHolder.Controls.Add(contentTextBox);
                    handledIds.Add(placeholderId);
                }
            }
        }


        private bool IsRealContent(string content)
        {
            if (content.Length > 50) return true;

            string testContent = content.Replace("<p>", "")
                                        .Replace("</p>", "")
                                        .Replace("&nbsp;", "")
                                        .Replace("&#160;", "")
                                        .Replace(" ", "")
                                        .Replace("<br/>", "");

            return !string.IsNullOrEmpty(testContent);
        }

    }
}