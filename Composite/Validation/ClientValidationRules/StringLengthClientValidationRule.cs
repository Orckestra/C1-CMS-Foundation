using System;


namespace Composite.Validation.ClientValidationRules
{
    [Serializable]
    public sealed class StringLengthClientValidationRule : ClientValidationRule
	{
        public StringLengthClientValidationRule(int lowerBound, int upperBound)
        {
            this.LowerBound = lowerBound;
            this.UpperBound = upperBound;
        }


        public int LowerBound
        {
            get;
            private set;
        }


        public int UpperBound
        {
            get;
            private set;
        }
	}
}
