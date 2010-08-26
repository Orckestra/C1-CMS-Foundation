using System;


namespace Composite.Data.Validation.ClientValidationRules
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
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
