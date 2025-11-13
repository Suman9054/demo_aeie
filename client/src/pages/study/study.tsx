import * as React from 'react';

import Markdown from 'react-markdown'
import { syllaus } from './syllabus';
import remarkGfm from 'remark-gfm'


const study: React.FunctionComponent= () => {
  return(
    <div className='text-blue-100 pt-20 gap-4  max-w-4xl mx-auto  '>    
   <Markdown remarkPlugins={[remarkGfm]} >
    {
        syllaus
    }
   </Markdown>
   </div> 
    
  ) ;
};

export default study;
