using System;


namespace Composite.Functions.ManagedParameters
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable()]    
    public sealed class ManagedParameterDefinition
    {
        /// <exclude />
        public ManagedParameterDefinition()
        {
            this.Id = Guid.NewGuid();
            this.HelpText = "";
            this.Position = -1;
        }

        /// <exclude />
        public Guid Id { get; set; }
        
        /// <exclude />
        public string Name { get; set; }

        /// <exclude />
        public string Label { get; set; }

        /// <exclude />
        public string HelpText { get; set; }

        /// <exclude />
        public int Position { get; set; }

        /// <exclude />
        public Type Type { get; set; }

        /// <exclude />
        public string WidgetFunctionMarkup { get; set; }

        /// <exclude />
        public string DefaultValueFunctionMarkup { get; set; }

        /// <exclude />
        public string TestValueFunctionMarkup { get; set; }
    }
}
