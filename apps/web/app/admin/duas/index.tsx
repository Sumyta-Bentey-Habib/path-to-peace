"use client";

import { useState } from "react";
import { 
  Heart, 
  Plus, 
  Search, 
  Edit, 
  Trash2
} from "lucide-react";
import { styles } from "./style";

const initialDuas = [
  { id: 1, title: "Morning Remembrance", category: "Daily", content: "All praise is to Allah who gave us life after he had caused us to die...", status: "Published" },
  { id: 2, title: "Anxiety & Stress", category: "Mental Health", content: "O Allah, I seek refuge in You from anxiety and sorrow...", status: "Published" },
  { id: 3, title: "Seeking Forgiveness", category: "Repentance", content: "I seek forgiveness from Allah, the Great...", status: "Draft" },
];

export default function DuasManagement() {
  const [duas] = useState(initialDuas);

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <div>
          <h1 className={styles.pageTitle}>Duas Repository</h1>
          <p className={styles.pageSubtitle}>Curate the prayers that heal the heart.</p>
        </div>
        <button className={styles.addButton}>
          <Plus size={20} />
          <span>Add New Dua</span>
        </button>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableToolbar}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={16} />
            <input 
              type="text" 
              placeholder="Filter by title or category..."
              className={styles.searchInput}
            />
          </div>
          <div className={styles.toolbarActions}>
            <button className={styles.actionLink}>Export CSV</button>
            <button className={styles.actionLink}>Bulk Actions</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={styles.tableHead}>
                <th className={styles.tableTh}>Title</th>
                <th className={styles.tableTh}>Category</th>
                <th className={styles.tableTh}>Status</th>
                <th className={`${styles.tableTh} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {duas.map((dua) => (
                <tr key={dua.id} className={styles.tableRow}>
                  <td className={styles.tableTd}>
                    <div className={styles.duaInfoCell}>
                      <div className={styles.duaIconBox}>
                        <Heart size={16} />
                      </div>
                      <div>
                        <p className={styles.duaTitle}>{dua.title}</p>
                        <p className={styles.duaExcerpt}>{dua.content}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableTd}>
                    <span className={styles.categoryBadge}>
                      {dua.category}
                    </span>
                  </td>
                  <td className={styles.tableTd}>
                    <div className={styles.statusIndicator}>
                      <div className={`${styles.statusDot} ${dua.status === 'Published' ? styles.statusPublished : styles.statusDraft}`} />
                      <span className="text-sm font-bold text-primary">{dua.status}</span>
                    </div>
                  </td>
                  <td className={`${styles.tableTd} text-right`}>
                    <div className={styles.actionsCell}>
                      <button className={styles.iconAction}>
                        <Edit size={18} />
                      </button>
                      <button className={styles.iconActionDelete}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.paginationSection}>
        <p className={styles.paginationInfo}>Showing 3 of 48 results</p>
        <div className={styles.paginationControls}>
          <button className={styles.pageBtn}>Previous</button>
          <button className={styles.pageBtnActive}>Next</button>
        </div>
      </div>
    </div>
  );
}
