using System;
using System.Collections.Generic;
using System.ComponentModel;
using Composite.Data.DynamicTypes;


namespace Composite.Functions.ManagedParameters
{
    [Serializable()]
    public sealed class ManagedParameterDefinition
    {
        public ManagedParameterDefinition()
        {
            this.Id = Guid.NewGuid();
            this.HelpText = "";
            this.Position = -1;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }

        public string Label { get; set; }
        public string HelpText { get; set; }

        public int Position { get; set; }
        public Type Type { get; set; }

        public string WidgetFunctionMarkup { get; set; }

        public string DefaultValueFunctionMarkup { get; set; }

        public string TestValueFunctionMarkup { get; set; }
    }
}
