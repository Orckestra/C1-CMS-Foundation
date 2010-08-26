using System;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Workflow;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [EntityTokenLock()]
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    /// <summary>
    /// Fictive workflow. Is used by ImageManipulatior in order to raise events in task system
    /// </summary>
    public sealed partial class EditMediaFileContentWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        public EditMediaFileContentWorkflow()
        {
            InitializeComponent();
        }


        private void initializeCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            DataEntityToken token = (DataEntityToken)this.EntityToken;
            IMediaFile file = (IMediaFile)token.Data;

            this.Bindings.Add("FileName", file.FileName);
            this.Bindings.Add("FileMimeType", file.MimeType);

            SetSaveStatus(true);
        }
    }
}
