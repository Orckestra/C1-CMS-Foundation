using Composite.Core.ResourceSystem;
using System;


namespace Composite.Core.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ClientAction
    {
        public string ActionToken { get; set; }
        public string Label { get; set; }
        public string ToolTip { get; set; }
        public bool Disabled { get; set; }
        public ResourceHandle Icon { get; set; }
        public ClientActionCategory ActionCategory { get; set; }
        public string CheckboxStatus { get; set; }
        public string TagValue { get; set; }

        public string ActionKey 
        {
            get
            {
                string secondaryValuesMashup = string.Format("{0}{1}{2}{3}{4}{5}{6}{7}{8}{9}{10}",
                    this.Label,
                    this.ToolTip,
                    this.Disabled,
                    this.Icon.ResourceName,
                    this.Icon.ResourceNamespace,
                    this.ActionCategory.FolderName,
                    this.ActionCategory.GroupId,
                    this.ActionCategory.IsInFolder,
                    this.ActionCategory.IsInToolbar,
                    this.ActionCategory.Name,
                    this.CheckboxStatus);

                return this.ActionToken.GetHashCode() + "::" + secondaryValuesMashup.GetHashCode();
            }
            set
            {
            	// now being returned from client via SOAP!
            	// throw new InvalidOperationException("This can not be set");
            }
        }
    }
}
