using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Functions
{
	internal interface IDowncastableFunction : IFunction
	{
        bool ReturnValueIsDowncastable { get; }
	}
}
