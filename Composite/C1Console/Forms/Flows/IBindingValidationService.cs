using System;
using System.Collections.Generic;
using Composite.C1Console.Actions;

namespace Composite.C1Console.Forms.Flows
{
    internal interface IBindingValidationService : IFlowControllerService
    {
        Dictionary<string, Exception> BindingErrors { get; }
    }
}
