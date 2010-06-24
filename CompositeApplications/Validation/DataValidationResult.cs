using Composite.Data;
using Microsoft.Practices.EnterpriseLibrary.Validation;

namespace Composite.Validation
{
	public sealed class DataValidationResult
	{
        internal DataValidationResult(IData data, ValidationResults validationResults)
        {
            this.Data = data;
            this.ValidationResults = validationResults;
        }


        public IData Data
        {
            get;
            private set;
        }


        public ValidationResults ValidationResults
        {
            get;
            private set;
        }


        public T GetData<T>()
            where T : class, IData
        {
            return (T)this.Data;
        }
	}
}
