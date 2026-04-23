'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Tool = {
  id: string
  name: string
  ai_type: string
  core_function: string
  benefits: string
  limitations: string
  insight: string
  target_user: string
  region: string
  tags: string
  category_id: string
}

const cats: Record<string, {label:string;color:string;bg:string}> = {
  'C-1':{label:'Workflow & Automation',color:'#534AB7',bg:'#EEEDFE'},
  'C-2':{label:'ESG Products',color:'#0A7C84',bg:'#E1F5EE'},
  'C-3':{label:'Research & Models',color:'#BA7517',bg:'#FAEEDA'},
}

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([])
  const [filtered, setFiltered] = useState<Tool[]>([])
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')
  const [selected, setSelected] = useState<Tool|null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('tools').select('*').order('id').then(({data}) => {
      if(data){setTools(data);setFiltered(data)}
      setLoading(false)
    })
  },[])

  useEffect(() => {
    let r = tools
    if(cat !== 'all') r = r.filter(t => t.category_id === cat)
    if(search){
      const q = search.toLowerCase()
      r = r.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.ai_type.toLowerCase().includes(q) ||
        t.core_function.toLowerCase().includes(q) ||
        (t.tags||'').toLowerCase().includes(q)
      )
    }
    setFiltered(r)
  },[search,cat,tools])

  const Panel = ({tool}:{tool:Tool}) => (
    <div style={{position:'fixed',top:0,right:0,width:'400px',height:'100vh',background:'white',borderLeft:'1px solid #e0e0e0',overflowY:'auto',zIndex:100}}>
      <div style={{padding:'16px 20px',borderBottom:'1px solid #e0e0e0',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,background:'white'}}>
        <span style={{fontWeight:'600',color:'#0D2137',fontSize:'15px'}}>{tool.name}</span>
        <button onClick={()=>setSelected(null)} style={{border:'1px solid #ddd',borderRadius:'6px',padding:'4px 10px',cursor:'pointer',background:'none',fontSize:'13px'}}>✕ Close</button>
      </div>
      <div style={{padding:'20px'}}>
        <div style={{background:'#E1F5EE',borderRadius:'8px',padding:'12px',marginBottom:'16px'}}>
          <div style={{fontSize:'11px',fontWeight:'600',color:'#0F6E56',marginBottom:'4px'}}>KEY INSIGHT</div>
          <div style={{fontSize:'13px',color:'#085041',lineHeight:'1.6'}}>{tool.insight}</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'16px'}}>
          {[{l:'AI Type',v:tool.ai_type},{l:'Region',v:tool.region},{l:'Target User',v:tool.target_user},{l:'Category',v:cats[tool.category_id]?.label}].map(item=>(
            <div key={item.l} style={{background:'#f8f8f8',borderRadius:'8px',padding:'10px'}}>
              <div style={{fontSize:'10px',color:'#888',marginBottom:'3px',textTransform:'uppercase'}}>{item.l}</div>
              <div style={{fontSize:'12px',fontWeight:'500',color:'#0D2137'}}>{item.v}</div>
            </div>
          ))}
        </div>
        <div style={{marginBottom:'14px'}}>
          <div style={{fontSize:'11px',fontWeight:'600',color:'#888',textTransform:'uppercase',marginBottom:'6px'}}>Core Function</div>
          <div style={{fontSize:'13px',color:'#333',lineHeight:'1.6'}}>{tool.core_function}</div>
        </div>
        <div style={{marginBottom:'14px'}}>
          <div style={{fontSize:'11px',fontWeight:'600',color:'#888',textTransform:'uppercase',marginBottom:'6px'}}>Benefits & Limitations</div>
          <div style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#1D9E75',marginTop:'5px',flexShrink:0}}></div>
            <div style={{fontSize:'13px',color:'#333',lineHeight:'1.5'}}>{tool.benefits}</div>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#E24B4A',marginTop:'5px',flexShrink:0}}></div>
            <div style={{fontSize:'13px',color:'#333',lineHeight:'1.5'}}>{tool.limitations}</div>
          </div>
        </div>
        <div>
          <div style={{fontSize:'11px',fontWeight:'600',color:'#888',textTransform:'uppercase',marginBottom:'6px'}}>Tags</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
            {(tool.tags||'').split(',').map(tag=>(
              <span key={tag} style={{fontSize:'11px',padding:'3px 8px',background:'#f0f0f0',borderRadius:'6px',color:'#555'}}>{tag.trim()}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{fontFamily:'system-ui,sans-serif',minHeight:'100vh',background:'#F2F8F9'}}>
      <div style={{background:'#0D2137',padding:'0 24px',height:'52px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'24px',height:'24px',background:'#1D9E75',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{color:'white',fontSize:'11px',fontWeight:'bold'}}>AI</span>
          </div>
          <span style={{color:'white',fontWeight:'500',fontSize:'15px'}}>AI Sustainability Registry</span>
          <span style={{color:'#5EC8CD',fontSize:'12px'}}>/ EMC Research</span>
        </div>
        <span style={{color:'#5EC8CD',fontSize:'12px'}}>{tools.length} tools indexed</span>
      </div>

      <div style={{background:'white',padding:'28px 24px 20px',borderBottom:'1px solid #e0e0e0'}}>
        <h1 style={{margin:'0 0 6px',fontSize:'22px',fontWeight:'600',color:'#0D2137'}}>AI Applications in Sustainability</h1>
        <p style={{margin:'0 0 16px',color:'#666',fontSize:'14px',maxWidth:'600px'}}>A searchable registry of AI tools, models and workflows across ESG reporting, emissions management, research and enterprise sustainability platforms.</p>
        <div style={{display:'flex',gap:'12px'}}>
          {[{n:tools.length,l:'Total tools'},{n:3,l:'Categories'},{n:8,l:'AI types'},{n:6,l:'Regions'}].map(s=>(
            <div key={s.l} style={{background:'#F2F8F9',borderRadius:'8px',padding:'10px 16px'}}>
              <div style={{fontSize:'22px',fontWeight:'600',color:'#0D2137'}}>{s.n}</div>
              <div style={{fontSize:'11px',color:'#888'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'white',padding:'12px 24px',borderBottom:'1px solid #e0e0e0',display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}}>
        <input
          type="text"
          placeholder="Search tools, AI type, tags..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
          style={{padding:'8px 14px',borderRadius:'8px',border:'1px solid #ddd',fontSize:'13px',width:'280px',outline:'none'}}
        />
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {[{k:'all',l:'All'},{k:'C-1',l:'Workflow & Automation'},{k:'C-2',l:'ESG Products'},{k:'C-3',l:'Research & Models'}].map(c=>(
            <button key={c.k} onClick={()=>setCat(c.k)} style={{padding:'6px 14px',borderRadius:'20px',fontSize:'12px',cursor:'pointer',border:'1px solid',background:cat===c.k?'#0D2137':'white',color:cat===c.k?'white':'#444',borderColor:cat===c.k?'#0D2137':'#ddd'}}>
              {c.l}
            </button>
          ))}
        </div>
        <span style={{fontSize:'12px',color:'#888',marginLeft:'auto'}}>Showing {filtered.length} of {tools.length}</span>
      </div>

      <div style={{padding:'20px 24px'}}>
        {loading ? (
          <div style={{textAlign:'center',padding:'60px',color:'#888'}}>Loading tools...</div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'14px'}}>
            {filtered.map(tool=>{
              const c = cats[tool.category_id]||{label:'',color:'#888',bg:'#f5f5f5'}
              return (
                <div key={tool.id} onClick={()=>setSelected(tool)}
                  style={{background:'white',borderRadius:'12px',border:'1px solid #e8e8e8',padding:'16px',cursor:'pointer'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='#0A7C84')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='#e8e8e8')}
                >
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                    <span style={{fontSize:'10px',fontWeight:'600',padding:'3px 8px',borderRadius:'10px',background:c.bg,color:c.color}}>{c.label}</span>
                    <span style={{fontSize:'10px',padding:'3px 8px',borderRadius:'10px',background:'#E1F5EE',color:'#085041'}}>{tool.ai_type}</span>
                  </div>
                  <h3 style={{margin:'0 0 6px',fontSize:'15px',fontWeight:'600',color:'#0D2137'}}>{tool.name}</h3>
                  <p style={{margin:'0 0 12px',fontSize:'12px',color:'#666',lineHeight:'1.5'}}>{tool.core_function}</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'4px',marginBottom:'10px'}}>
                    {(tool.tags||'').split(',').slice(0,3).map(tag=>(
                      <span key={tag} style={{fontSize:'10px',padding:'2px 6px',background:'#f5f5f5',borderRadius:'4px',color:'#666'}}>{tag.trim()}</span>
                    ))}
                  </div>
                  <div style={{background:'#E1F5EE',borderRadius:'6px',padding:'8px',fontSize:'11px',color:'#085041',lineHeight:'1.4'}}>
                    <strong>Insight: </strong>{tool.insight}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {selected && <Panel tool={selected} />}
    </div>
  )
}