using System;
using System.Collections.Generic;
using Composite.C1Console.Workflow.Activities;
using Composite.Data.Validation.ClientValidationRules;

namespace Composite.C1Console.Workflow
{
    /// <exclude />
    public class OnDeliverFormDataParameters
    {
        /// <exclude />
        public Dictionary<string, object> Bindings { get; set; }

        /// <exclude />
        public Dictionary<string, List<ClientValidationRule>> BindingsValidationRules { get; set; }
    }

    /// <summary>
    /// An interface for forms workflow extensions
    /// </summary>
    public interface IFormsWorkflowExtension
    {
        /// <summary>
        /// In implementation custom workflow activities can be added.
        /// </summary>
        /// <param name="workflow">The workflow instance.</param>
        void Initialize(FormsWorkflow workflow);

        /// <summary>
        /// Handles form data delivery event
        /// </summary>
        /// <param name="workflow">The workflow instance.</param>
        /// <param name="parameters">The parameters.</param>
        void OnDeliverFormData(FormsWorkflow workflow, OnDeliverFormDataParameters parameters);
    }
}
