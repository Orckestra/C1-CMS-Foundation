using System;
using System.Collections.Generic;

namespace Composite.C1Console.Forms.Flows
{
    internal class BindingValidationService: IBindingValidationService
    {
        public BindingValidationService(Dictionary<string, Exception> validationErrors)
        {
            BindingErrors = validationErrors;
        }

        public Dictionary<string, Exception> BindingErrors
        {   
            get;
            private set;
        }
    }
}
