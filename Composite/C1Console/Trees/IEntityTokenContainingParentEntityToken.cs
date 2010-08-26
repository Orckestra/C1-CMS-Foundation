using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees
{
    internal interface IEntityTokenContainingParentEntityToken
    {
        EntityToken GetParentEntityToken();
    }
}
