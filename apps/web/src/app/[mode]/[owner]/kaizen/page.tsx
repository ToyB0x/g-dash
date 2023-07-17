import 'server-only'

export default function Page({ params }: { params: { owner: string } }) {
  return (
    <ul style={{ paddingLeft: '2rem' }}>
      <li>PR待ち</li>
      <li>PR数過多 / PRコスト過多(PRクオリティ向上が必要)</li>
      <li>マージまでのリードタイム(PR粒度や難易度の調整が必要)</li>
      <li>時間外勤務アラート</li>
    </ul>
  )
}
