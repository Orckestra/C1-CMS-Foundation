using Composite.Core.ResourceSystem;
using System;
using Composite.C1Console.Elements;


namespace Composite.Core.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ClientAction
    {
        /// <exclude />
        public string ActionToken { get; set; }

        /// <exclude />
        public string Label { get; set; }

        /// <exclude />
        public string ToolTip { get; set; }

        /// <exclude />
        public bool Disabled { get; set; }

        /// <exclude />
        public ResourceHandle Icon { get; set; }

        /// <exclude />
        public ClientActionCategory ActionCategory { get; set; }

        /// <exclude />
        public string CheckboxStatus { get; set; }

        /// <exclude />
        public string TagValue { get; set; }

        /// <exclude />
        public int ActivePositions { get; set; }

        /// <exclude />
        public DialogStrings BulkExecutionDialog { get; set; }

        /// <exclude />
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

                return (this.ActionToken + this.Label).GetHashCode() + "::" + secondaryValuesMashup.GetHashCode();
            }
            set
            {
            	// now being returned from client via SOAP!
            	// throw new InvalidOperationException("This can not be set");
            }
        }
    }
}
