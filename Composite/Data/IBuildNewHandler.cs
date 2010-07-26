using System;


namespace Composite.Data
{
    internal interface IBuildNewHandler
    {
        Type GetTypeToBuild(Type dataType);
    }
}
