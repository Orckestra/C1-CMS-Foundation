using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.ResourceSystem;


namespace Composite.Trees.Foundation
{
	internal class TreeException : Exception
	{
        public static TreeException CreateException(string stringName, params object[] args)
        {
            string resourceString = StringResourceSystemFacade.GetString("Composite.Trees", stringName);

            string message = string.Format(resourceString, args);

            return new TreeException(message);
        }


        public TreeException(string message)
            : base(message)
        {
        }
	}
}
