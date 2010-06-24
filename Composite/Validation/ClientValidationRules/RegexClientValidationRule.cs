using System;


namespace Composite.Validation.ClientValidationRules
{
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
