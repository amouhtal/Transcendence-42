#include <iostream>

int main ()
{
    std::string str = ")(";
    int count_i = 0;
    int count_j  = 0;
    
    for (int i = 0; str[i] ; i++)
        if (str[i] == '(')
            count_i++;
        else if (str[i] == ')')
            count_j++;
    if (count_i == count_j)
    {
        int braceIsOpen = 0; int braceIsClosed = 1;
        for (int i = 0; str[i]; i++)
        {
            if (str[i] == '(' && braceIsOpen == 0)
            {
                braceIsOpen = 1;
                braceIsClosed = 0;
            }
            if (str[i] == ')' && braceIsOpen == 1)
            {
                braceIsClosed = 1;
                braceIsOpen = 0;
            }
        }
        if (braceIsOpen || (!braceIsClosed))
        {
            std::cout << "false";
            return 0;
        }else
        {
            std::cout << "true";
            return 0;
        }
    }
    if (count_i != count_j)
        std::cout << "false";
    return 0;
}