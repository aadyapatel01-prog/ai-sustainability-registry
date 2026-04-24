'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  'https://gdmkwpwaehtmrlfpbtvb.supabase.co',
  'sb_publishable_JPtUAX3vRR-Ws7PoPi4jhA_pxnZFFZa'
)

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

const cats: Record<string, {label:string;badgeBg:string;badgeColor:string}> = {
  'C-1':{label:'Workflow & Automation',badgeBg:'#1E1A3E',badgeColor:'#AFA9EC'},
  'C-2':{label:'ESG Products',badgeBg:'#0A2420',badgeColor:'#5DCAA5'},
  'C-3':{label:'Research & Models',badgeBg:'#2A1E06',badgeColor:'#EF9F27'},
}

export default function Registry() {
  const router = useRouter()
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

  return (
    <div style={{background:'#0A0F1E',minHeight:'100vh',fontFamily:'system-ui,sans-serif',color:'#E2E8F0'}}>

      {/* Nav */}
      <div style={{background:'#0D1424',borderBottom:'1px solid #1E2A3E',padding:'0 28px',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px',cursor:'pointer'}} onClick={()=>router.push('/')}>
            <div style={{width:'28px',height:'28px',background:'#1D9E75',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'700',color:'#fff'}}>AI</div>
            <span style={{fontSize:'14px',fontWeight:'600',color:'#F1F5F9'}}>Sustainability Registry</span>
          </div>
          <div style={{display:'flex',gap:'4px'}}>
            {[{l:'Home',p:'/'},{l:'Registry',p:'/registry'},{l:'About',p:'/'},{l:'Submit a tool',p:'/'}].map(item=>(
              <div key={item.l} onClick={()=>router.push(item.p)} style={{fontSize:'13px',padding:'5px 12px',borderRadius:'6px',color:item.l==='Registry'?'#E2E8F0':'#94A3B8',background:item.l==='Registry'?'#1E2A3E':'transparent',cursor:'pointer'}}>{item.l}</div>
            ))}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <span style={{fontSize:'11px',padding:'3px 10px',borderRadius:'20px',background:'#1E2A3E',color:'#5EC8CD'}}>{tools.length} tools indexed</span>
          <button style={{fontSize:'12px',padding:'6px 14px',borderRadius:'8px',background:'#1D9E75',color:'#fff',border:'none',cursor:'pointer',fontWeight:'500'}}>+ Submit tool</button>
        </div>
      </div>

      {/* Hero */}
      <div style={{padding:'36px 28px 28px',borderBottom:'1px solid #1E2A3E'}}>
        <div style={{fontSize:'11px',fontWeight:'600',color:'#1D9E75',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'8px'}}>EMC Research · 2025</div>
        <h1 style={{fontSize:'26px',fontWeight:'700',color:'#F1F5F9',marginBottom:'8px'}}>AI Applications in Sustainability</h1>
        <p style={{fontSize:'14px',color:'#64748B',lineHeight:'1.7',maxWidth:'520px',marginBottom:'24px'}}>A searchable registry of AI tools, models and workflows across ESG reporting, emissions management, research and enterprise sustainability platforms.</p>
        <div style={{display:'flex',gap:'10px'}}>
          {[{n:String(tools.length),l:'Total tools'},{n:'3',l:'Categories'},{n:'8',l:'AI types'},{n:'6',l:'Regions'}].map(s=>(
            <div key={s.l} style={{background:'#0D1424',border:'1px solid #1E2A3E',borderRadius:'10px',padding:'12px 18px'}}>
              <div style={{fontSize:'22px',fontWeight:'700',color:'#1D9E75'}}>{s.n}</div>
              <div style={{fontSize:'11px',color:'#475569',marginTop:'2px'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div style={{background:'#0D1424',padding:'12px 28px',borderBottom:'1px solid #1E2A3E',display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap',position:'sticky',top:'56px',zIndex:40}}>
        <div style={{background:'#0A0F1E',border:'1px solid #1E2A3E',borderRadius:'8px',padding:'7px 14px',display:'flex',alignItems:'center',gap:'8px',width:'260px'}}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#475569" strokeWidth="1.3"/><line x1="8.5" y1="8.5" x2="12" y2="12" stroke="#475569" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <input
            type="text"
            placeholder="Search tools, AI type, tags…"
            value={search}
            onChange={e=>setSearch(e.target.value)}
            style={{background:'transparent',border:'none',outline:'none',fontSize:'13px',color:'#94A3B8',width:'100%'}}
          />
        </div>
        <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
          {[{k:'all',l:'All'},{k:'C-1',l:'Workflow & Automation'},{k:'C-2',l:'ESG Products'},{k:'C-3',l:'Research & Models'}].map(c=>(
            <button key={c.k} onClick={()=>setCat(c.k)} style={{fontSize:'12px',padding:'5px 12px',borderRadius:'20px',border:'1px solid',cursor:'pointer',background:cat===c.k?(c.k==='C-1'?'#1E1A3E':c.k==='C-2'?'#0A2420':c.k==='C-3'?'#2A1E06':'#1E2A3E'):'transparent',color:cat===c.k?(c.k==='C-1'?'#AFA9EC':c.k==='C-2'?'#5DCAA5':c.k==='C-3'?'#EF9F27':'#E2E8F0'):'#64748B',borderColor:cat===c.k?(c.k==='C-1'?'#3C3489':c.k==='C-2'?'#0F6E56':c.k==='C-3'?'#854F0B':'#1E2A3E'):'#1E2A3E'}}>
              {c.l}
            </button>
          ))}
        </div>
        <span style={{fontSize:'12px',color:'#475569',marginLeft:'auto'}}>Showing {filtered.length} of {tools.length}</span>
      </div>

      {/* Grid */}
      <div style={{padding:'24px 28px'}}>
        {loading ? (
          <div style={{textAlign:'center',padding:'80px',color:'#475569',fontSize:'14px'}}>Loading tools...</div>
        ) : filtered.length === 0 ? (
          <div style={{textAlign:'center',padding:'80px',color:'#475569',fontSize:'14px'}}>No tools found</div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:'14px'}}>
            {filtered.map(tool=>{
              const c = cats[tool.category_id]||{label:'',badgeBg:'#111',badgeColor:'#888'}
              return (
                <div key={tool.id} onClick={()=>setSelected(tool)}
                  style={{background:'#0D1424',borderRadius:'12px',border:`1px solid ${selected?.id===tool.id?'#1D9E75':'#1E2A3E'}`,padding:'18px',cursor:'pointer',transition:'border-color .15s'}}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='#1D9E75')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor=selected?.id===tool.id?'#1D9E75':'#1E2A3E')}
                >
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'14px'}}>
                    <span style={{fontSize:'10px',fontWeight:'600',padding:'3px 8px',borderRadius:'20px',background:c.badgeBg,color:c.badgeColor}}>{c.label}</span>
                    <span style={{fontSize:'10px',padding:'3px 8px',borderRadius:'20px',background:'#0A1A2A',color:'#5EC8CD',border:'1px solid #1E3A4E'}}>{tool.ai_type}</span>
                  </div>
                  <div style={{fontSize:'15px',fontWeight:'600',color:'#F1F5F9',marginBottom:'5px'}}>{tool.name}</div>
                  <div style={{fontSize:'12px',color:'#475569',lineHeight:'1.5',marginBottom:'12px'}}>{tool.core_function}</div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'5px',marginBottom:'12px'}}>
                    {(tool.tags||'').split(',').slice(0,3).map(tag=>(
                      <span key={tag} style={{fontSize:'10px',padding:'2px 7px',background:'#0A0F1E',border:'1px solid #1E2A3E',borderRadius:'5px',color:'#64748B'}}>{tag.trim()}</span>
                    ))}
                  </div>
                  <div style={{background:'#0A2420',border:'1px solid #0F3A2E',borderRadius:'7px',padding:'8px 10px',fontSize:'11px',color:'#5DCAA5',lineHeight:'1.45'}}>
                    <strong style={{color:'#1D9E75',marginRight:'3px'}}>Insight:</strong>{tool.insight}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selected && (
        <div style={{position:'fixed',top:0,right:0,width:'380px',height:'100vh',background:'#0D1424',borderLeft:'1px solid #1E2A3E',overflowY:'auto',zIndex:100}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid #1E2A3E',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,background:'#0D1424'}}>
            <span style={{fontWeight:'600',color:'#F1F5F9',fontSize:'15px'}}>{selected.name}</span>
            <button onClick={()=>setSelected(null)} style={{border:'1px solid #1E2A3E',borderRadius:'6px',padding:'4px 10px',cursor:'pointer',background:'none',fontSize:'12px',color:'#64748B'}}>✕ Close</button>
          </div>
          <div style={{padding:'20px'}}>
            <div style={{background:'#0A2420',border:'1px solid #0F3A2E',borderRadius:'8px',padding:'14px',marginBottom:'16px'}}>
              <div style={{fontSize:'10px',fontWeight:'700',color:'#1D9E75',letterSpacing:'.06em',textTransform:'uppercase',marginBottom:'6px'}}>Key insight</div>
              <div style={{fontSize:'13px',color:'#5DCAA5',lineHeight:'1.6'}}>{selected.insight}</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'16px'}}>
              {[{l:'AI Type',v:selected.ai_type},{l:'Region',v:selected.region},{l:'Target user',v:selected.target_user},{l:'Category',v:cats[selected.category_id]?.label}].map(item=>(
                <div key={item.l} style={{background:'#0A0F1E',border:'1px solid #1E2A3E',borderRadius:'8px',padding:'10px'}}>
                  <div style={{fontSize:'10px',color:'#475569',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:'4px'}}>{item.l}</div>
                  <div style={{fontSize:'12px',fontWeight:'500',color:'#E2E8F0'}}>{item.v}</div>
                </div>
              ))}
            </div>
            <div style={{fontSize:'10px',fontWeight:'700',color:'#475569',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:'7px'}}>Core function</div>
            <div style={{fontSize:'13px',color:'#94A3B8',lineHeight:'1.6',marginBottom:'16px'}}>{selected.core_function}</div>
            <div style={{fontSize:'10px',fontWeight:'700',color:'#475569',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:'10px'}}>Benefits & limitations</div>
            <div style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
              <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#1D9E75',marginTop:'5px',flexShrink:0}}></div>
              <div style={{fontSize:'13px',color:'#94A3B8',lineHeight:'1.5'}}>{selected.benefits}</div>
            </div>
            <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
              <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#E24B4A',marginTop:'5px',flexShrink:0}}></div>
              <div style={{fontSize:'13px',color:'#94A3B8',lineHeight:'1.5'}}>{selected.limitations}</div>
            </div>
            <div style={{fontSize:'10px',fontWeight:'700',color:'#475569',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:'8px'}}>Tags</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>
              {(selected.tags||'').split(',').map(tag=>(
                <span key={tag} style={{fontSize:'11px',padding:'3px 8px',background:'#0A0F1E',border:'1px solid #1E2A3E',borderRadius:'6px',color:'#64748B'}}>{tag.trim()}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{background:'#0D1424',borderTop:'1px solid #1E2A3E',padding:'20px 28px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:'12px',color:'#475569'}}>AI Sustainability Registry · EMC Research · 2025</div>
        <div style={{display:'flex',gap:'16px'}}>
          {['About','Submit a tool','GitHub'].map(l=>(
            <span key={l} style={{fontSize:'12px',color:'#475569',cursor:'pointer'}}>{l}</span>
          ))}
        </div>
      </div>

    </div>
  )
}
