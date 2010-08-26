using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Practices.EnterpriseLibrary.Validation;
using Composite.Data;

namespace Composite.Data.Validation
{
	internal interface IValidationFacade
	{
        ValidationResults Validate<T>(T data) where T : class, IData;
        ValidationResults Validate(Type interfaceType, IData data);
        void OnFlush();
	}
}
