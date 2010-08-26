using System;


namespace Composite.Data.Validation.ClientValidationRules
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class RegexClientValidationRule : ClientValidationRule
	{
        public RegexClientValidationRule(string expression)
        {
            this.Expression = expression;
        }


        public string Expression
        {
            get;
            private set;
        }
    }
}
